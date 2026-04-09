document.addEventListener("DOMContentLoaded", () => {
    /* ============================================================
    IRON FORCE GYM/js/main.js — BLADE & CO.
    ============================================================

    機能一覧
    1. NAVBAR — スクロールで背景切り替え
    2. Back to Top ボタン
    3. ハンバーガーメニュー
    4. スムーズスクロール
    5. メニュー／プランタブ切り替え
    6. フォーム送信（API 保存 → 完了表示）

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

    if (toggleBtn && menu && mask){
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
    }
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

    /* ============================================================
    5. メニュー／プランタブ切り替え
    ============================================================ */
    const btns   = document.querySelectorAll('.plans__btn');
    const panels = document.querySelectorAll('.plans__panel');
    if (btns.length) {
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                panels.forEach(p => {
                    p.classList.toggle('active', p.id === target);
                });
            });
        });
    }

    /* ============================================================
    6. フォーム送信（テーブル名・完了要素IDを引数で指定）
    ============================================================ */
    const form = document.querySelector('.js-contact');
    const success = document.querySelector('.js-contact__success');

    if (!form) return;

    // 日付デフォルト（明日）
    const dateInput = form.querySelector('#date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        dateInput.min = today.toISOString().split('T')[0];
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('input[type="submit"]');
        const originalText = btn.value;
        // ローディング
        btn.value = '送信中...';
        btn.disabled = true;
        
        // データ取得
        const data = {};
        form.querySelectorAll('input, select, textarea').forEach(field => {
        if (field.name) data[field.name] = field.value;
        });

        if (!form.checkValidity()){
            form.reportValidity();
            btn.disabled = false;
            btn.value = originalText;
            return;
        }
        try{
            await fetch('https://script.google.com/macros/s/AKfycbzXiSV2UMnX3nSY8wNAeSnDYauITdKEEULn74ViKEgc8x3NWgjR4DRyEpEPPUuzDGptjA/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'no-cors'
            });

            // 成功処理
            form.style.display = 'none';
            if (success) success.style.display = 'flex';

        } catch (error){
            console.error(error);
            alert("送信に失敗しました");
            btn.disabled = false;
            btn.value = originalText;
        }
    });
});