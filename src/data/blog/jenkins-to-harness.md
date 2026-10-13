---
title: Moving from Jenkins to Harness: a practical migration guide
date: 2026-10-12
summary: How Jenkins concepts map to Harness, a side-by-side Jenkinsfile and pipeline YAML, and a step-by-step migration plan with common gotchas.
tags: CI/CD, Jenkins, Harness, DevOps
---

If your team has run Jenkins for years, you probably have a pile of Jenkinsfiles, shared libraries, plugins, credentials and a few build agents that nobody wants to touch. Harness is a popular next step because it ships CI, CD, secrets, approvals and rollbacks in one platform, and pipelines are plain YAML. This post is a practical map of what changes when you move, so you can plan the migration instead of discovering it halfway through.

> The YAML below is trimmed to show the shape of a Harness pipeline. Field names and defaults change between versions, so check the current Harness docs before copying anything into production.

## Think in concepts, not in syntax

The biggest mistake is translating a Jenkinsfile line by line. Most Jenkins ideas have a Harness equivalent, but they live in different places.

| Jenkins | Harness |
| --- | --- |
| Jenkinsfile (Groovy) | Pipeline YAML (stages and steps) |
| Agent / node / label | Delegate, or Harness Cloud / Kubernetes build infrastructure |
| Credentials | Secrets (managed by Harness or your vault) |
| Plugins | Built-in steps, plugin steps, connectors |
| Shared library | Templates (step, stage or pipeline templates) |
| Build parameters | Runtime inputs and input sets |
| Multibranch pipeline, webhooks | Triggers with branch and event conditions |
| `post { failure { ... } }` | Failure strategies and conditional execution |
| Manual `input` step | Approval steps |

## A simple Jenkinsfile

Here is a typical Java service build: compile and test with Maven, build an image, then deploy.

```groovy
pipeline {
  agent { label 'maven' }
  environment {
    IMAGE = 'registry.example.com/payments/account-updater'
  }
  stages {
    stage('Build and test') {
      steps { sh 'mvn -B clean verify' }
    }
    stage('Image') {
      steps {
        sh "docker build -t $IMAGE:$BUILD_NUMBER ."
        sh "docker push $IMAGE:$BUILD_NUMBER"
      }
    }
    stage('Deploy') {
      steps { sh "./deploy.sh $IMAGE:$BUILD_NUMBER" }
    }
  }
  post {
    failure { echo 'Build failed' }
  }
}
```

## The same idea in Harness

The CI part becomes a stage of type `CI`. Instead of a node with a label, you pick the build infrastructure, and every step can run in its own container image.

```yaml
pipeline:
  name: account-updater
  identifier: account_updater
  properties:
    ci:
      codebase:
        connectorRef: github_connector
        repoName: account-updater
        build: <+input>
  stages:
    - stage:
        name: Build and test
        identifier: build_and_test
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Maven verify
                  identifier: maven_verify
                  spec:
                    connectorRef: docker_hub
                    image: maven:3.9-eclipse-temurin-17
                    shell: Sh
                    command: mvn -B clean verify
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and push image
                  identifier: build_and_push
                  spec:
                    connectorRef: docker_hub
                    repo: payments/account-updater
                    tags:
                      - <+pipeline.sequenceId>
```

Two things to notice. Credentials never appear in the file, because the registry and Git access come from **connectors** that reference secrets. And the build number you used as `$BUILD_NUMBER` is now an expression, `<+pipeline.sequenceId>`.

The deployment half is where Harness differs most. Rather than a `deploy.sh`, you describe a **service**, an **environment** and an **infrastructure definition**, choose a deployment strategy (rolling, blue-green or canary), and let Harness handle rollback if verification fails.

## A migration plan that works

1. **Inventory first.** List every Jenkins job, the plugins it uses, the credentials it reads and who triggers it. Many jobs turn out to be dead.
2. **Start with one low-risk service.** Pick a service with simple build steps and an easy rollback, and migrate it end to end.
3. **Set up connectors and secrets once.** Git, container registry, artifact repository and cluster connectors are reused by every pipeline.
4. **Install delegates close to your systems.** Delegates make outbound connections to Harness, so they need network access to your internal registries and clusters. Firewall rules are the most common source of "it works in Jenkins but not here".
5. **Turn shared libraries into templates.** If ten Jenkinsfiles call the same Groovy helper, build one step or stage template and reuse it.
6. **Run both in parallel for a while.** Keep the Jenkins job green until the Harness pipeline has produced a few good releases, then switch the trigger.
7. **Decommission deliberately.** Disable the Jenkins job, keep it for a release or two, then archive it.

## Gotchas worth knowing

- **Plugins without a one-to-one replacement.** Check each plugin. Many are covered by built-in steps, some by plugin steps, and a few mean running a script in a container.
- **Groovy logic.** Complex conditionals and loops in a Jenkinsfile do not carry over. Move logic into scripts in your repo and call them from a `Run` step, or use conditional execution.
- **Secrets scope.** Decide up front whether secrets live at the account, organization or project level, and who can use them.
- **Caching.** Maven and Docker layer caches are not automatic. Configure caching or your builds will feel slower than on a warm Jenkins agent.
- **Audit and compliance.** If you scan with tools such as Checkmarx, Black Duck or SonarQube, add them as steps so the checks stay part of the pipeline.

## Is it worth it?

Harness is a good fit when you want deployments, approvals and rollbacks managed in the same tool as your builds, and you are tired of maintaining Jenkins plugins and agents. If your Jenkins setup is small and stable, the migration may not pay for itself. Either way, treat it as a chance to delete old jobs and standardize your pipelines, not just move them.
