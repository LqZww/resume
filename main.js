var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters

    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar

})




//添加offset类
let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
}

setTimeout(function () {
    findClosest()
}, 10)


window.onscroll = function (x) {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()
}

function findClosest() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }

    //minIndex就是离窗口顶部最近的元素
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for (let i = 0; i < brothersAndMe.length; i++) {
        brothersAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}

let liTags = document.querySelectorAll('nav.menu > ul > li')
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }
}


let aTags = document.querySelectorAll('nav.menu > ul > li > a')


function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);




for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop
        // 上面四句等于下面一句
        // let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop

        // let n = 20  //一共动多少次
        // let t = 500 / n //多长时间动一次
        let currentTop = window.scrollY
        let targetTop = top - 80
        let s = targetTop - currentTop	//路程
        // let S = s / n
        // let i = 0
        // let id = setInterval(() => {
        // 	if (i === n) {
        // 		window.clearInterval(id)
        // 		return
        // 	}
        // 	i = i + 1
        // 	window.scrollTo(0, currentTop + S * i)
        // }, t)

        var coords = { y: currentTop };	//起始位置
        var t = Math.abs((s / 100) * 300)	//时间
        if (t > 500) {
            t = 500
        }
        var tween = new TWEEN.Tween(coords)		//起始位置
            .to({ y: targetTop }, t)		//结束位置和时间
            .easing(TWEEN.Easing.Quadratic.InOut)	//缓动类型
            .onUpdate(function () {
                window.scrollTo(0, coords.y)	//如何更新界面
            })
            .start();	//开始缓动
    }
}