(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = theme => {
        const activeThemeBtn = document.querySelector('#bd-theme')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)

        const themeIcon = theme === 'dark'
            ? '<i class="bi-moon-stars-fill my-1 theme-icon-active"></i>'
            : '<i class="bi-sun-fill my-1 theme-icon-active"></i>';

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
        })

        btnToActive.classList.add('active')
        activeThemeBtn.innerHTML = themeIcon
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    localStorage.setItem('theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })

    const customGrid = document.querySelector('#custom-grid')
    const gridSizeInput = document.querySelector('#grid-size-input')
    let blockCount = 6

    document.querySelectorAll('input[name="cell-size-picker"]').forEach(radio => {
        radio.addEventListener('change', () => {
            setGridSize()
        })
    })

    gridSizeInput.addEventListener('change', () => {
        setGridSize()
    })

    const getCellSize = () => {
        if (document.querySelector('#is-fraction-radio').checked)
            return '1fr'
        else if (document.querySelector('#is-absolute-radio').checked)
            return '200px'
        return '1fr'
    }

    const setGridSize = () => {
        var cellSize = getCellSize()
        customGrid.setAttribute('style', `grid-template-columns: repeat(${gridSizeInput.value}, ${cellSize});`)
    }

    setGridSize()

    const addBlockBtn = document.querySelector('#add-block-btn')
    const removeBlockBtn = document.querySelector('#remove-block-btn')

    addBlockBtn.addEventListener('click', () => {
        let block = document.createElement('div')
        block.classList.add(getBlockColor(), 'text-dark', 'p-3')
        block.appendChild(document.createTextNode(`Block ${++blockCount}`))
        customGrid.appendChild(block)
    })

    removeBlockBtn.addEventListener('click', () => {
        customGrid.removeChild(customGrid.lastElementChild)
    })

    const getBlockColor = () => {
        var seed = Math.floor(Math.random() * 6) + 1
        switch (seed) {
            case 1:
                return 'bg-success'
            case 2:
                return 'bg-info'
            case 3:
                return 'bg-warning'
            case 4:
                return 'bg-primary'
            case 5:
                return 'bg-danger'
            case 6:
                return 'bg-secondary'
            default:
                return 'bg-success'
        }
    }
})()
