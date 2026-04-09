document.addEventListener("DOMContentLoaded", () => {
    /* ============================================================
    Aura Coffee/css/style.css — AURA COFFEE
    ============================================================

    機能一覧
    1. HEADER（NAVBAR） — スクロールで .is-scrolled クラスを付け外し
    2. ハンバーガー — モバイル用ドロワー開閉
    3. スムーススクロール - ページトップからの動き

    ============================================================ */

    /* ============================================================
    1. NAVBAR — スクロールで .scrolled クラスを付け外し
    ============================================================ */
    const navi = document.querySelector('.js-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
            navi.classList.add('is-scrolled');
        }else{
            navi.classList.remove('is-scrolled');
        }
    });

    /* ============================================================
    2. ハンバーガー — モバイル用ドロワー開閉
    ============================================================ */
    const toggleBtn = document.querySelector('.js-toggle');
    const menu = document.querySelector('.js-menu');
    const mask = document.querySelector('.js-mask');

    if(!toggleBtn || !menu || !mask) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('is-open');

        if(isOpen){
            menu.classList.remove('is-open');
            mask.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
        }else{
            menu.classList.add('is-open');
            mask.classList.add('is-open');
            toggleBtn.classList.add('is-open');
        }
    });

    /* ============================================================
    3. スムーススクロール - ページトップからの動き
    ============================================================ */
    const links =document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const href = link.getAttribute('href');
            const target = href === '#' || href === ''
            ? document.documentElement
            : document.querySelector(href);

            if(!target)return;

            const header = document.querySelector('.js-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const position = target.offsetTop - headerHeight;

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        });
    });
});