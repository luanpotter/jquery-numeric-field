replaceArg() {
  echo "$1: "
  read value
  sed -i "s/{$1}/$value/g" bower.json package.json Gruntfile.js README.md
}

replaceArg 'name'
replaceArg 'desc'
replaceArg 'repo'
replaceArg 'keywords'
replaceArgs 'main-file'

echo 'Done!'

echo 'Deleting this script...'
rm setup.sh

