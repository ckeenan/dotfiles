set fileformat=unix
call pathogen#infect()
call pathogen#helptags()
call pathogen#runtime_append_all_bundles()

syntax on
filetype plugin indent on

"set the json tidying
"au BufRead,BufNewFile *.json set filetype=json foldmethod=syntax
"au! Syntax json source $HOME/.vim/syntax/json.vim

"set undotree hotkey
nnoremap <F5> :UndotreeToggle<cr>
set undodir=~/.vim/undo
set undofile
set undolevels=1000
set undoreload=10000

"keep cursor in middle
set so=999

"colorscheme vividchalk
" colorscheme seoul256
" colorscheme vividchalk
colorscheme wombat256
set guifont=Monaco:h12

"set bg=black

:nnoremap <Bslash> :noh<return><Bslash>

set backspace=indent,eol,start "dunno what this does

set hidden "hides buffers instead of closing them
set hlsearch " hilight search terms  nohlsearch will turn off
set incsearch " show search matches as you type

"set vim working dir to directory of current file
set autochdir

set laststatus=2    " vim-airline
let g:airline_theme='light'

"PyMode"
let g:pymode_rope = 1

" Documentation
 let g:pymode_doc = 1
 let g:pymode_doc_key = 'K'

 "Linting
 let g:pymode_lint = 1
 let g:pymode_lint_checker = "pyflakes,pep8"
 " Auto check on save
 let g:pymode_lint_write = 1

 " Support virtualenv
 let g:pymode_virtualenv = 1

 " Enable breakpoints plugin
 let g:pymode_breakpoint = 1
 let g:pymode_breakpoint_key = '<leader>b'

 " syntax highlighting
 let g:pymode_syntax = 1
 let g:pymode_syntax_all = 1
 let g:pymode_syntax_indent_errors = g:pymode_syntax_all
 let g:pymode_syntax_space_errors = g:pymode_syntax_all

 " Don't autofold code
 let g:pymode_folding = 0
 nnoremap <space> za

 vnoremap <space> zf

 set foldmethod=indent
 set foldignore=


set ai
set showmatch
highlight SpecialKey ctermfg=DarkGray
set listchars=tab:>-,trail:~
set list
setlocal smartindent cinwords=if,elif,else,for,while,try,except,finally,def,class

" Set jade tab default to 2
autocmd Filetype jade setlocal tabstop=2
autocmd Filetype jade setlocal shiftwidth=2

set tabstop=4
set shiftwidth=4
set shiftround " use multiple shiftwidth when indenting with '<' and '>'
set showmatch " set show matching parenthesis

set expandtab
set autoindent
set copyindent " copy the previous indentatino on autoindenting
set number " always show line numbers

set smartindent
syntax on
set listchars=tab:>-
set listchars+=trail:.
set ignorecase " ingore case when searching
set smartcase " ignore case if search pattern is all lowercase, case-sensitive,etc.
set smarttab " insert tabs on the start of a line according to shiftwidths, not tabstops

set history=1000
set wildignore=*.swp,*.bak,*.pyc,*.class
set title       " change the terminal title
set visualbell  " don't beep
set noerrorbells " don't beep
set nobackup
set noswapfile

set mouse=a     " enable use of mouse in all modes
set ttymouse=xterm2     " recognize mouse codes for xterm2 terminal type

map <C-t><up> :tabr<cr>
map <C-t><down> :tabl<cr>
map <C-t><left> :tabp<cr>
map <C-t><right> :tabn<cr>

map <silent> <leader>ev :e $MYVIMRC<CR>
map <silent> <leader>sv :so $MYVIMRC<CR>

map <F2> :NERDTreeToggle<CR>
