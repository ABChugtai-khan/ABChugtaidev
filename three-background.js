// ============================================
// Simple Snake Background (Canvas Version)
// Lightweight + Mouse Follow
// ============================================

class SimpleSnakeBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bg-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Snake
        this.snake = [];
        this.snakeLength = 25;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
        
        // Particles
        this.particles = [];
        this.particleCount = 80;
        
        this.init();
    }
    
    init() {
        // Style canvas
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        
        document.body.prepend(this.canvas);
        this.resize();
        
        // Create initial snake positions
        for (let i = 0; i < this.snakeLength; i++) {
            this.snake.push({
                x: this.mouseX - i * 8,
                y: this.mouseY
            });
        }
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        // Event listeners
        window.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.targetX = e.touches[0].clientX;
                this.targetY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        window.addEventListener('resize', () => this.resize());
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    updateSnake() {
        // Smooth mouse follow
        this.mouseX += (this.targetX - this.mouseX) * 0.1;
        this.mouseY += (this.targetY - this.mouseY) * 0.1;
        
        // Add new head position
        this.snake.unshift({
            x: this.mouseX,
            y: this.mouseY
        });
        
        // Remove last segment if too long
        if (this.snake.length > this.snakeLength) {
            this.snake.pop();
        }
    }
    
    updateParticles() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Attract to mouse
            p.x += (this.mouseX - p.x) * 0.0005;
            p.y += (this.mouseY - p.y) * 0.0005;
            
            // Wrap around edges
            if (p.x < 0) p.x = window.innerWidth;
            if (p.x > window.innerWidth) p.x = 0;
            if (p.y < 0) p.y = window.innerHeight;
            if (p.y > window.innerHeight) p.y = 0;
        });
    }
    
    drawSnake() {
        // Draw snake body
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            const size = i === 0 ? 10 : (8 - (i * 0.2));
            const opacity = 1 - (i / this.snakeLength);
            
            // Segment color - head cyan, body blue gradient
            const gradient = this.ctx.createRadialGradient(
                segment.x, segment.y, 0,
                segment.x, segment.y, size
            );
            
            if (i === 0) {
                // Head - bright cyan
                gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(0, 200, 255, ${opacity * 0.8})`);
                gradient.addColorStop(1, `rgba(0, 150, 255, 0)`);
            } else {
                // Body - blue to dark blue
                gradient.addColorStop(0, `rgba(0, 150, 255, ${opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(0, 100, 200, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(0, 50, 150, 0)`);
            }
            
            this.ctx.beginPath();
            this.ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Glow effect for head
            if (i === 0) {
                this.ctx.beginPath();
                this.ctx.arc(segment.x, segment.y, size + 5, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
                this.ctx.fill();
                
                // Eyes
                this.drawEyes(segment.x, segment.y, size);
            }
        }
        
        // Draw connecting lines between segments
        this.ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        for (let i = 0; i < this.snake.length - 1; i++) {
            const current = this.snake[i];
            const next = this.snake[i + 1];
            
            this.ctx.moveTo(current.x, current.y);
            this.ctx.lineTo(next.x, next.y);
        }
        
        this.ctx.stroke();
    }
    
    drawEyes(x, y, headSize) {
        // Eye whites
        const eyeOffsetX = 3;
        const eyeOffsetY = 3;
        
        // Left eye
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffsetX, y - eyeOffsetY, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        
        // Right eye
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffsetX, y + eyeOffsetY, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        
        // Pupils (look towards mouse)
        const pupilDX = (this.targetX - x) * 0.01;
        const pupilDY = (this.targetY - y) * 0.01;
        
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffsetX + pupilDX, y - eyeOffsetY + pupilDY, 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffsetX + pupilDX, y + eyeOffsetY + pupilDY, 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
    
    drawParticles() {
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
            this.ctx.fill();
            
            // Glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity * 0.3})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        // Clear canvas with trail effect
        this.ctx.fillStyle = 'rgba(15, 15, 15, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update
        this.updateSnake();
        this.updateParticles();
        
        // Draw
        this.drawParticles();
        this.drawSnake();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSnakeBackground();
});