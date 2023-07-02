// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

function handleScroll(options) {
    window.onscroll = () => {
        if (Math.floor(window.scrollY) >= 300) {
            options.menu.classList.add('active');
        }
        if (window.scrollY === 0) {
            options.menu.classList.remove('active');
        }

        if (options.background) {
            if (options.background.getBoundingClientRect().top <= 200 && options.background.getBoundingClientRect().top >= 100) {
                options.background.style.backgroundPosition = '50% ' + (options.background.getBoundingClientRect().top) * -1 + 'px';
            }
        }
    }
}

function handleNumbers(number, nameAttribute) {
    const item = number.getAttribute(nameAttribute);
    let currentValue = 1;
    let interval = 5;

    const timer = setInterval(function () {
        if (currentValue > item) {
            clearInterval(timer);
            return;
        }
        number.innerText = currentValue;
        currentValue++;
    }, interval);
}

function isActive(options, element, index) {
    const listImg = document.querySelectorAll(options.card_type_img);
    const startPagination = options.quantity * index
    const endPagination = options.quantity + startPagination;

    document.querySelector(options.card_type + '.active').classList.remove('active');
    element.classList.add('active');

    const listActiveRemove = document.querySelectorAll(options.card_type_img + '.active')
    listActiveRemove.forEach((img) => {
        img.classList.remove('active');
    })
    Array.from(listImg).filter((img, key) => {
        return endPagination > key && startPagination <= key
    }).forEach(img => img.classList.add('active'));;
}

const eventMove = function (options, listType) {

    const next = document.querySelector(options.event.next).parentElement
    const prev = document.querySelector(options.event.prev).parentElement
    let index;
    let element
    let moveElement

    function isIndex(selector, typeIndex) {
        return Array.from(selector).reduce((acc, ele, i) => {
            if (ele.classList.contains('active')) {
                if (typeIndex) {
                    acc = i + 1
                    if (ele.nextElementSibling.classList.contains('__other'))
                        acc = i + 2
                } else {
                    acc = i - 1
                    if (ele.previousElementSibling.classList.contains('__other'))
                        acc = i - 2
                }
            }
            return acc;
        }, 0);
    }

    next.onclick = () => {
        element = document.querySelector(options.card_type + '.active')
        index = isIndex(document.querySelectorAll(options.card_type), true)
        if (index < listType.length - 1 && index >= 0) {
            moveElement = document.querySelector(options.cardTypeParent).querySelector(`:nth-child(${index + 1})`)
            isActive(options, moveElement, index - 1)
        }
    }

    prev.onclick = () => {
        element = document.querySelector(options.card_type + '.active')
        index = isIndex(document.querySelectorAll(options.card_type), false)
        if (index > 0) {
            moveElement = document.querySelector(options.cardTypeParent).querySelector(`:nth-child(${index + 1})`)
            isActive(options, moveElement, index - 1)
        }
    }
}

function handlePagination(options) {
    const listType = document.querySelectorAll(options.card_type);

    listType.forEach((element, index) => {
        console.log(element)
        element.onclick = () => {
            if (!element.classList.contains('__other') && !element.previousElementSibling.classList.contains('__other'))
                isActive(options, element, index)
            else if (!element.classList.contains('__other')  && element.previousElementSibling.classList.contains('__other'))
                isActive(options, element, index - 1)

        }
    });

    if (options.event) {
        eventMove(options, listType)
    }
}

