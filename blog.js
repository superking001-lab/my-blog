// 博客数据
const posts = {
    1: {
        id: 1,
        title: "深入理解 JavaScript 异步编程",
        tag: "JavaScript",
        date: "2026-02-14",
        readingTime: "5 分钟",
        content: `
            <p>JavaScript 的异步步程是理解这门语言的关键。今天我们来深入探讨 Promise、async/await 以及事件循环机制。</p>

            <h2>什么是异步编程？</h2>
            <p>异步编程允许程序在等待长时间操作（如网络请求）完成时继续执行其他任务。JavaScript 使用事件循环（Event Loop）来实现这个功能。</p>

            <h2>Promise 基础</h2>
            <p>Promise 是一个代表异步操作最终完成或失败的对象。它有三种状态：</p>
            <ul>
                <li><strong>pending</strong> - 初始状态，既不是成功也不是失败</li>
                <li><strong>fulfilled</strong> - 操作成功完成</li>
                <li><strong>rejected</strong> - 操作失败</li>
            </ul>

            <pre><code>const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("操作成功！"), 1000);
});

promise.then(result => {
    console.log(result); // "操作成功！"
}).catch(error => {
    console.error(error);
});</code></pre>

            <h2>async/await 语法</h2>
            <p>async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码。</p>

            <pre><code>async function fetchData() {
    try {
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}</code></pre>

            <p>这种写法让代码更加清晰易读，是现代 JavaScript 异步编程的主流方式。</p>
        `
    },
    2: {
        id: 2,
        title: "CSS Grid 网格布局完全指南",
        tag: "CSS",
        date: "2026-02-13",
        readingTime: "8 分钟",
        content: `
            <p>CSS Grid 是一个强大的二维布局系统，可以帮助我们创建复杂的网页布局。</p>

            <h2>基础概念</h2>
            <p>Grid 布局由 grid container（网格容器）和 grid items（网格项）组成。</p>

            <pre><code>.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}</code></pre>

            <h2>常用属性</h2>
            <ul>
                <li><code>grid-template-columns</code> - 定义列的尺寸和数量</li>
                <li><code>grid-template-rows</code> - 定义行的尺寸和数量</li>
                <li><code>gap</code> - 设置网格间距</li>
                <li><code>grid-area</code> - 定义项目位置</li>
            </ul>

            <h2>实战示例</h2>
            <pre><code>.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.content {
    grid-area: content;
}

.layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar content content";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
}</code></pre>
        `
    },
    3: {
        id: 3,
        title: "现代前端开发工作流",
        tag: "前端",
        date: "2026-02-12",
        readingTime: "6 分钟",
        content: `
            <p>现代前端开发已经从简单的 HTML + CSS 发展到复杂的工程化体系。让我们一起探讨现代前端开发的工作流。</p>

            <h2>版本控制</h2>
            <p>Git 是现代开发不可或缺的工具，用于代码版本管理和团队协作。</p>
            <ul>
                <li>分支管理：feature、develop、release 等分支策略</li>
                <li>代码审查：Pull Request / Merge Request</li>
                <li>CI/CD：自动化测试和部署</li>
            </ul>

            <h2>构建工具</h2>
            <p>现代前端项目需要构建工具来处理：</p>
            <ul>
                <li>代码转译（Babel、SWC）</li>
                <li>CSS 预处理（PostCSS、Sass）</li>
                <li>模块打包（Webpack、Vite）</li>
                <li>资源优化（压缩、Tree Shaking）</li>
            </ul>

            <h2>开发体验</h2>
            <p>优秀的开发体验能极大提升效率：</p>
            <ul>
                <li>热更新（HMR）</li>
                <li>类型检查（TypeScript）</li>
                <li>代码格式化（Prettier、ESLint）</li>
            </ul>
        `
    }
};

// 评论数据（使用 localStorage 持久化）
const STORAGE_KEY = 'blog_comments';
let commentsData = loadComments();

// 从 localStorage 加载评论
function loadComments() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error('加载评论失败：', e);
        return {};
    }
}

// 保存评论到 localStorage
function saveComments() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsData));
    } catch (e) {
        console.error('保存评论失败：', e);
    }
}

// 格式化相对时间
function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `刚刚`;
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} 天前`;
    if (diff < 31104000) return `${Math.floor(diff / 2592000)} 个月前`;
    return `${Math.floor(diff / 31104000)} 年前`;
}

// 从 URL 获取文章 ID
function getPostId() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id) : 1;
}

// HTML 转义（防止 XSS）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 加载文章内容
function loadPost() {
    const postId = getPostId();
    const post = posts[postId];

    if (!post) {
        document.getElementById('post-title').textContent = '文章未找到';
        document.getElementById('post-content').innerHTML = '<p>抱歉，您访问的文章不存在。</p>';
        return;
    }

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-tag').textContent = post.tag;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-content').innerHTML = post.content;

    // 初始化评论
    if (!commentsData[postId]) {
        commentsData[postId] = [];
    }

    renderComments();
}

// 渲染评论列表
function renderComments() {
    const postId = getPostId();
    const comments = commentsData[postId] || [];
    const commentsList = document.getElementById('comments-list');
    const commentsCount = document.getElementById('comments-count');

    commentsCount.textContent = comments.length;

    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="empty-comments">暂无评论，快来抢沙发吧~</div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.author)}</span>
                <span class="comment-time">${comment.timeStr}</span>
            </div>
            <div class="comment-body">${escapeHtml(comment.text)}</div>
        </div>
    `).join('');
}

// 提交评论
function handleSubmit(e) {
    e.preventDefault();

    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    const author = authorInput.value.trim();
    const content = contentInput.value.trim();

    // 验证输入
    if (!author || !content) {
        alert('请填写昵称和评论内容');
        return;
    }

    if (author.length > 50) {
        alert('昵称不能超过 50 个字符');
        return;
    }

    if (content.length > 500) {
        alert('评论内容不能超过 500 个字符');
        return;
    }

    const postId = getPostId();
    const comment = {
        author,
        text: content,
        date: new Date().toISOString(),
        timeStr: '刚刚'
    };

    // 添加评论到列表
    if (!commentsData[postId]) {
        commentsData[postId] = [];
    }

    commentsData[postId].unshift(comment);
    saveComments();
    renderComments();

    // 清空表单
    authorInput.value = '';
    contentInput.value = '';

    // 显示成功消息
    alert('评论发表成功！');
}

// 定期更新评论时间显示
function updateCommentTimes() {
    const postId = getPostId();
    const comments = commentsData[postId] || [];

    let updated = false;
    comments.forEach(comment => {
        const newTimeStr = formatRelativeTime(new Date(comment.date));
        if (newTimeStr !== comment.timeStr) {
            comment.timeStr = newTimeStr;
            updated = true;
        }
    });

    if (updated) {
        renderComments();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadPost();

    // 绑定表单提交事件
    const form = document.getElementById('comment-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // 每分钟更新一次评论时间显示
    setInterval(updateCommentTimes, 60000);
});
