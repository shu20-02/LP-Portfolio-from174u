document.addEventListener("DOMContentLoaded", () => {
    /* ============================================================
    barbershop/js/main.js — BLADE & CO.
    ============================================================

    機能一覧
    1. HEADER（NAVBAR）     — スクロールで .is-scrolled クラスを付け外し
    2. Back to Top — スクロール400px以上で表示
    3. ハンバーガー — モバイル用ドロワー開閉
    4. スムーズスクロール（ナビバー高さ分オフセット）

    ============================================================ */

    /* ============================================================
    1. NAVBAR — スクロールで .scrolled クラスを付け外し
    ============================================================ */
    const navi = document.querySelector('.js-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 40){
            navi.classList.add('is-scrolled');
        }else{
            navi.classList.remove('is-scrolled');
        }
    });

    /* ============================================================
    2. Back to Top — スクロール400px以上で表示
    ============================================================ */
    const back_top = document.querySelector('.js-back');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 400){
            back_top.classList.add('is-visual');
        }else{
            back_top.classList.remove('is-visual');
        }
    });
    back_top.addEventListener('click', () => {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        });
    });

    /* ============================================================
    3. ハンバーガー — モバイル用ドロワー開閉
    ============================================================ */
    const toggleBtn = document.querySelector('.js-toggle');
    const menu = document.querySelector('.js-menu');
    const mask = document.querySelector('.js-mask');

    if (!toggleBtn || !menu || !mask) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('is-open');

        if (isOpen) {
            menu.classList.remove('is-open');
            mask.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
        } else {
            menu.classList.add('is-open');
            mask.classList.add('is-open');
            toggleBtn.classList.add('is-open');
        }
    });
    mask.addEventListener('click', () => {
        menu.classList.remove('is-open');
        mask.classList.remove('is-open');
        toggleBtn.classList.remove('is-open');
    });

    /* ============================================================
    4. スムーズスクロール（ナビバー高さ分オフセット）
    ============================================================ */
    const navbar = document.querySelector('.js-nav');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // トップリンク
            if (href === '#' || href === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();

            const offset = navbar?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });
});