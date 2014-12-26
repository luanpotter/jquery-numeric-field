IFS=

replace() {
  sed -i "s/{$1}/$2/g" bower.json package.json Gruntfile.js _README.md
}

replaceArg() {
  echo "$1: "
  read value
  replace $1 $value
  RETURN_VALUE="$value"
}

source config.sh

replace 'name-email' $NAME
replace 'github-username' $GITHUB

replaceArg 'name'
replaceArg 'desc'

replaceArg 'repo'
REPO="$RETURN_VALUE"

replaceArg 'keywords'
replaceArg 'main-file'

git remote set-url origin "git@github.com:${NAME}/${REPO}.git"

echo 'Done!'

echo 'Replacing README...'
mv _README.md README.md

echo 'Deleting this script...'
rm config.sh
rm setup.sh

