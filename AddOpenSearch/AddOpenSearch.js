// ==UserScript==
// @name         AddOpenSearch
// @namespace    https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/AddOpenSearch.js
// @version      0
// @description  .
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const ENGINES = [{
            match: /bilibili\.com/,
            name: 'Bilibili',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/search.bilibili.com.xml'
        },
        {
            match: /mastodon\.social/,
            name: 'Mastodon',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/mastodon.social.xml'
        },
        {
            match: /facebook\.com/,
            name: 'Facebook',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/www.facebook.com.xml'
        },
        {
            match: /reddit\.com/,
            name: 'Reddit',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/www.reddit.com.xml'
        },
        {
            match: /quora\.com/,
            name: 'Quora',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/www.quora.com.xml'
        },
        {
            match: /annas-archive\.is/,
            name: 'annas-archive',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/annas-archive.is.xml'
        },
        {
            match: /neocities\.org/,
            name: 'Neocities',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/neocities.org.xml'
        },
        {
            match: /tumblr\.com/,
            name: 'Tumblr',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/www.tumblr.com.xml'
        },
        {
            match: /threads\.com/,
            name: 'Threads',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/www.threads.com.xml'
        },
        {
            match: /bsky\.app/,
            name: 'Bsky',
            xmlUrl: 'https://raw.githubusercontent.com/xiongyuxi22/Thisrepositoryisformyownuse/refs/heads/main/AddOpenSearch/bsky.app.xml'
        }
    ];
    const hostname = location.hostname;
    const config = ENGINES.find(e => {
        if (typeof e.match === 'string') return hostname.includes(e.match);
        if (e.match instanceof RegExp) return e.match.test(hostname);
        if (typeof e.match === 'function') return e.match(hostname);
        return false;
    });
    if (!config) {
        return;
    }
    if (document.head) {
        inject(config);
        return;
    }
    const observer = new MutationObserver((mutations, obs) => {
        if (document.head) {
            inject(config);
            obs.disconnect();
        }
    });
    if (document.documentElement) {
        observer.observe(document.documentElement, {
            childList: true
        });
    } else {
        const check = setInterval(() => {
            if (document.documentElement) {
                clearInterval(check);
                if (document.head) {
                    inject(config);
                } else {
                    observer.observe(document.documentElement, {
                        childList: true
                    });
                }
            }
        }, 10);
    }
    function inject(cfg) {
        if (document.querySelector('link[rel="search"][type="application/opensearchdescription+xml"]')) {
            return;
        }
        const link = document.createElement('link');
        link.rel = 'search';
        link.type = 'application/opensearchdescription+xml';
        link.title = cfg.name;
        link.href = cfg.xmlUrl;
        document.head.appendChild(link);
    }
})();
