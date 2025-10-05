// 主要的 JavaScript 功能
class NeuroForgeApp {
    constructor() {
        this.promptInput = document.getElementById('promptInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.btnLoader = document.getElementById('btnLoader');
        this.imagePlaceholder = document.getElementById('imagePlaceholder');
        this.imageResult = document.getElementById('imageResult');
        this.generatedImage = document.getElementById('generatedImage');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');
        this.charCount = document.getElementById('charCount');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCharCount();
    }
    
    setupEventListeners() {
        // 输入框事件
        this.promptInput.addEventListener('input', () => {
            this.updateCharCount();
        });
        
        // 生成按钮事件
        this.generateBtn.addEventListener('click', () => {
            this.generateArt();
        });
        
        // 下载按钮事件
        this.downloadBtn.addEventListener('click', () => {
            this.downloadImage();
        });
        
        // 重新生成按钮事件
        this.regenerateBtn.addEventListener('click', () => {
            this.generateArt();
        });
        
        // 回车键生成
        this.promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                this.generateArt();
            }
        });
    }
    
    updateCharCount() {
        const count = this.promptInput.value.length;
        this.charCount.textContent = `${count}/200`;
        
        // 根据字符数改变颜色
        if (count > 180) {
            this.charCount.style.color = '#ff6b6b';
        } else if (count > 150) {
            this.charCount.style.color = '#ffd93d';
        } else {
            this.charCount.style.color = '#b0b0b0';
        }
    }
    
    async generateArt() {
        const prompt = this.promptInput.value.trim();
        
        if (!prompt) {
            this.showNotification('请输入描述文字', 'error');
            return;
        }
        
        if (prompt.length < 5) {
            this.showNotification('描述文字太短，请详细描述', 'error');
            return;
        }
        
        // 显示加载状态
        this.setLoadingState(true);
        
        try {
            // 模拟 API 调用 - 在实际应用中替换为真实的 AI API
            const imageUrl = await this.callAIApi(prompt);
            
            // 显示生成结果
            this.showGeneratedImage(imageUrl);
            this.showNotification('艺术作品生成成功！', 'success');
            
        } catch (error) {
            console.error('生成失败:', error);
            this.showNotification('生成失败，请稍后重试', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async callAIApi(prompt) {
        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 在实际应用中，这里应该调用真实的 AI 图片生成 API
        // 例如：Stable Diffusion API, DALL-E API 等
        
        // 暂时返回一个占位图片 URL
        // 你可以替换为真实的 API 调用
        const placeholderImages = [
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop'
        ];
        
        const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
        return randomImage;
    }
    
    showGeneratedImage(imageUrl) {
        this.generatedImage.src = imageUrl;
        this.generatedImage.alt = this.promptInput.value;
        
        this.imagePlaceholder.style.display = 'none';
        this.imageResult.style.display = 'block';
    }
    
    setLoadingState(isLoading) {
        if (isLoading) {
            this.generateBtn.classList.add('loading');
            this.generateBtn.disabled = true;
        } else {
            this.generateBtn.classList.remove('loading');
            this.generateBtn.disabled = false;
        }
    }
    
    downloadImage() {
        const imageUrl = this.generatedImage.src;
        const prompt = this.promptInput.value;
        
        // 创建临时链接进行下载
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `neuroforge-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('图片下载开始', 'success');
    }
    
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4ecdc4' : '#45b7d1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
        `;
        
        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
        
        // 关闭按钮事件
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// 粒子系统
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 100 };
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(0, 255, 255, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        for (let particle of this.particles) {
            // 鼠标交互
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                particle.x += Math.cos(angle) * force * 2;
                particle.y += Math.sin(angle) * force * 2;
            }
            
            // 边界检查
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // 移动粒子
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // 绘制连接线
            for (let otherParticle of this.particles) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new NeuroForgeApp();
    
    console.log(`
    🧠 NeuroForge AI 艺术生成器已加载!
    ✨ 功能特色:
       • 赛博朋克视觉设计
       • 实时粒子背景动画
       • AI 图片生成模拟
       • 响应式界面设计
    `);
});