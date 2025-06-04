document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelectorAll('.particle');
    const hero = document.querySelector('.hero');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Only add mouse events if it's not a touch device
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        // Track mouse position
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        // Reset particles when mouse leaves
        hero.addEventListener('mouseleave', () => {
            particles.forEach(particle => {
                particle.classList.remove('interactive');
                particle.style.transform = 'translate(0px, 0px)';
            });
        });

        // Animate particles
        function animateParticles() {
            particles.forEach((particle, index) => {
                const rect = particle.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;

                // Calculate distance from mouse
                const dx = mouseX - particleX;
                const dy = mouseY - particleY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate movement based on distance
                if (distance < 200) {
                    // Add some randomness to make movement more natural
                    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
                    const force = (200 - distance) / 200;
                    
                    // Different particles move at slightly different speeds
                    const speed = 50 + (index % 3) * 10;
                    targetX = Math.cos(angle) * force * speed;
                    targetY = Math.sin(angle) * force * speed;
                    
                    particle.classList.add('interactive');
                } else {
                    // Slowly return to original position
                    targetX *= 0.95;
                    targetY *= 0.95;
                    
                    if (Math.abs(targetX) < 0.1 && Math.abs(targetY) < 0.1) {
                        targetX = 0;
                        targetY = 0;
                        particle.classList.remove('interactive');
                    }
                }

                // Apply smooth movement
                const currentTransform = particle.style.transform || 'translate(0px, 0px)';
                const match = currentTransform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
                const currentX = match ? parseFloat(match[1]) : 0;
                const currentY = match ? parseFloat(match[2]) : 0;

                // Smooth easing
                const newX = currentX + (targetX - currentX) * 0.1;
                const newY = currentY + (targetY - currentY) * 0.1;

                particle.style.transform = `translate(${newX}px, ${newY}px)`;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
}); 