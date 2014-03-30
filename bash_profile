#export PATH=/opt/local/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH
export PATH=~/Projects/Lib/vlfeat-0.9.16/bin/maci64:$PATH
export PATH=~/Dev/Lib/AWS-ElasticBeanstalk-CLI-2.6.0/eb/macosx/python2.7:$PATH
export PATH=/usr/local/sbin:$PATH
export MANPATH=~/Projects/Lib/vlfeat-0.9.16/src:$MANPATH
export PYTHONPATH=/usr/local/bin/python:$PYTHONPATH

# AWS CREDS
source ~/Documents/Dev/private/aws.sh

# Set vi as bash insert mode
set -o vi

# Turn on ls colors
export CLICOLOR=1
export LSCOLORS=ExFxCxDxBxegedabagacad

# Turn on grep colors
export GREP_OPTIONS='--color=always'

HISTFILESIZE=1000000000
HISTSIZE=1000000

source ~/.git-completion.bash


if [ -f /etc/bash_completio ]; then
    . /etc/bash_completion
fi

# {{{
# Node Completion - Auto-generated, do not touch.
shopt -s progcomp
for f in $(command ls ~/.node-completion); do
  f="$HOME/.node-completion/$f"
  test -f "$f" && . "$f"
done
# }}}

# Set the default profile
echo -e "\033]50;SetProfile=Default\a"

. ~/nvm/nvm.sh
nvm use v0.8.0

##
# Your previous /Users/ckeenan89/.bash_profile file was backed up as /Users/ckeenan89/.bash_profile.macports-saved_2012-12-01_at_19:10:06
##

# MacPorts Installer addition on 2012-12-01_at_19:10:06: adding an appropriate PATH variable for use with MacPorts.
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.


### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
export PATH=/usr/local/bin:$PATH

test -r /sw/bin/init.sh && . /sw/bin/init.sh

. ~/.git_svn_bash_prompt
