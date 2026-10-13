// GitHub Pages serves 404.html for unknown paths. Making it a copy of
// index.html lets deep links like /blog/some-post work when refreshed.
import { copyFileSync } from 'node:fs';

copyFileSync('build/index.html', 'build/404.html');
