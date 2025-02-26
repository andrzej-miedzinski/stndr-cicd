const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Lista bibliotek do publikacji
const libraries = ['ui', 'data-access', 'util'];

// Katalog dla bibliotek
const libsDir = 'my-libs';

libraries.forEach(lib => {
  const projectJsonPath = path.join(libsDir, lib, 'project.json');
  
  // Buduj bibliotekę
  console.log(`Building ${lib}...`);
  execSync(`nx build ${libsDir}-${lib}`);
  
  // Zaktualizuj wersję i opublikuj
  console.log(`Publishing ${lib}...`);
  const distPath = path.join('dist', libsDir, lib);
  
  // Upewnij się, że package.json ma wszystkie potrzebne pola
  const packageJsonPath = path.join(distPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Aktualizacja package.json o dodatkowe informacje jeśli potrzebne
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Publikuj do npmjs (użyj dry-run do przetestowania)
  execSync(`cd ${distPath} && npm publish --dry-run`);
  console.log(`${lib} published successfully!`);
});