// Sign2Speech - Premium Apple-Level Application
// Advanced AI-Powered Sign Language Translation Platform
// Built with cutting-edge web technologies for maximum performance and accessibility

class Sign2SpeechApp {
    constructor() {
        this.isInitialized = false;
        this.currentTheme = this.getSystemTheme();
        this.currentLanguage = 'en';
        this.camera = null;
        this.hands = null;
        this.isRecognitionActive = false;
        this.gestureCount = 0;
        this.averageConfidence = 0;
        this.testimonialIndex = 0;
        this.chatMessages = [];
        this.analytics = {
            charts: {},
            counters: {},
            realTimeData: {}
        };
        
        // Gesture templates with enhanced recognition
        this.gestureTemplates = {
            hello: { name: "Hello", emoji: "👋", speech: "Hello! Nice to meet you!" },
            thanks: { name: "Thank You", emoji: "🙏", speech: "Thank you so much!" },
            please: { name: "Please", emoji: "🤲", speech: "Please, if you would" },
            yes: { name: "Yes", emoji: "👍", speech: "Yes, absolutely!" },
            no: { name: "No", emoji: "👎", speech: "No, not at all" },
            help: { name: "Help", emoji: "🆘", speech: "I need help, please" },
            sorry: { name: "Sorry", emoji: "😔", speech: "I'm sorry about that" },
            love: { name: "I Love You", emoji: "🤟", speech: "I love you" }
        };

        // Language translations
        this.translations = {
            en: {
                welcome: "Welcome to Sign2Speech",
                startCamera: "Start Camera",
                stopCamera: "Stop Camera",
                speakGesture: "Speak Gesture",
                voiceInput: "Voice Input",
                clearChat: "Clear Chat"
            },
            es: {
                welcome: "Bienvenido a Sign2Speech",
                startCamera: "Iniciar Cámara",
                stopCamera: "Detener Cámara",
                speakGesture: "Hablar Gesto",
                voiceInput: "Entrada de Voz",
                clearChat: "Limpiar Chat"
            },
            fr: {
                welcome: "Bienvenue à Sign2Speech",
                startCamera: "Démarrer la Caméra",
                stopCamera: "Arrêter la Caméra",
                speakGesture: "Parler le Geste",
                voiceInput: "Entrée Vocale",
                clearChat: "Effacer le Chat"
            },
            de: {
                welcome: "Willkommen bei Sign2Speech",
                startCamera: "Kamera Starten",
                stopCamera: "Kamera Stoppen",
                speakGesture: "Geste Sprechen",
                voiceInput: "Spracheingabe",
                clearChat: "Chat Löschen"
            },
            ja: {
                welcome: "Sign2Speechへようこそ",
                startCamera: "カメラ開始",
                stopCamera: "カメラ停止",
                speakGesture: "ジェスチャーを話す",
                voiceInput: "音声入力",
                clearChat: "チャットをクリア"
            }
        };

        // Initialize when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            this.showLoadingScreen();
            await this.loadExternalLibraries();
            
            // Initialize all components
            this.initializeTheme();
            this.initializeNavigation();
            this.initializeScrollEffects();
            this.initializeLanguageSystem();
            this.initializeHeroSection();
            this.initializeFeaturesSection();
            this.initializeTechnologySection();
            this.initializeDemoSection();
            this.initializeAnalyticsSection();
            this.initializeTestimonialsSection();
            this.initializePricingSection();
            this.initializeContactSection();
            this.initializeAccessibilityFeatures();
            this.initializeChatWidget();
            this.initializeNotificationSystem();
            
            // Start real-time updates
            this.startRealTimeUpdates();
            
            this.isInitialized = true;
            this.hideLoadingScreen();
            
            // Show welcome notification
            this.showNotification('Welcome to Sign2Speech! 🚀', 'success', {
                title: 'Application Ready',
                duration: 4000
            });
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showNotification('Failed to initialize application', 'error', {
                title: 'Initialization Error',
                duration: 8000
            });
        }
    }

    async loadExternalLibraries() {
        const libraries = [
            { name: 'Lucide', check: () => typeof lucide !== 'undefined' },
            { name: 'Chart.js', check: () => typeof Chart !== 'undefined' }
        ];

        for (const lib of libraries) {
            if (!lib.check()) {
                console.warn(`${lib.name} not loaded, some features may be limited`);
            }
        }

        // Initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ============ THEME SYSTEM ============
    initializeTheme() {
        const themeToggle = document.getElementById('themeToggle');
        
        this.applyTheme(this.currentTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(this.currentTheme);
                this.saveThemePreference(this.currentTheme);
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-preference')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    getSystemTheme() {
        const saved = localStorage.getItem('theme-preference');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeToggleState(theme);
    }

    updateThemeToggleState(theme) {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
    }

    saveThemePreference(theme) {
        localStorage.setItem('theme-preference', theme);
    }

    // ============ NAVIGATION SYSTEM ============
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavClose = document.getElementById('mobileNavClose');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        // Scroll effects
        window.addEventListener('scroll', this.throttle(() => {
            this.updateScrollProgress();
            this.updateActiveNavLink();
            this.updateNavbarAppearance();
        }, 16));

        // Mobile menu controls
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
            mobileNavClose?.addEventListener('click', () => this.closeMobileMenu());
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!navbar?.contains(e.target) && mobileNav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href?.startsWith('#')) {
                    this.smoothScrollToSection(href.substring(1));
                    this.closeMobileMenu();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        if (scrollProgress) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateNavbarAppearance() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (this.currentTheme === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.08)';
            }
        }
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileNav && mobileMenuBtn) {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                mobileNav.classList.add('active');
                mobileMenuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileNav && mobileMenuBtn) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    // ============ SCROLL EFFECTS ============
    initializeScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('animate-counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.animate-in, .animate-counter, .glass-card').forEach(el => {
            observer.observe(el);
        });

        // Hero scroll indicator
        const scrollIndicator = document.getElementById('heroScrollIndicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.smoothScrollToSection('features');
            });
        }
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(Math.floor(current));
        }, 20);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // ============ LANGUAGE SYSTEM ============
    initializeLanguageSystem() {
        const languageBtn = document.getElementById('languageBtn');
        const languageMenu = document.getElementById('languageMenu');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageBtn && languageMenu) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                languageMenu.classList.remove('active');
            });
        }

        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.switchLanguage(lang);
                languageMenu?.classList.remove('active');
            });
        });
    }

    switchLanguage(lang) {
        if (!this.translations[lang]) return;

        this.currentLanguage = lang;
        
        // Update language button
        const languageBtnText = document.querySelector('#languageBtn span');
        if (languageBtnText) {
            languageBtnText.textContent = lang.toUpperCase();
        }

        // Update active language option
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });

        // Update UI text (simplified for demo)
        this.updateUILanguage(lang);
    }

    updateUILanguage(lang) {
        const translations = this.translations[lang];
        
        // Update button texts
        const startCameraBtn = document.getElementById('startCameraBtn');
        const stopCameraBtn = document.getElementById('stopCameraBtn');
        const speakBtn = document.getElementById('speakBtn');
        const micBtn = document.getElementById('micBtn');
        const clearChatBtn = document.getElementById('clearChatBtn');

        if (startCameraBtn) startCameraBtn.querySelector('span').textContent = translations.startCamera;
        if (stopCameraBtn) stopCameraBtn.querySelector('span').textContent = translations.stopCamera;
        if (speakBtn) speakBtn.querySelector('span').textContent = translations.speakGesture;
        if (micBtn) micBtn.querySelector('span').textContent = translations.voiceInput;
    }

    // ============ HERO SECTION ============
    initializeHeroSection() {
        const heroDemoBtn = document.getElementById('heroDemoBtn');
        const heroLearnBtn = document.getElementById('heroLearnBtn');
        const gesturePreview = document.getElementById('gesturePreview');

        if (heroDemoBtn) {
            heroDemoBtn.addEventListener('click', () => {
                this.addButtonRipple(heroDemoBtn);
                this.smoothScrollToSection('demo');
            });
        }

        if (heroLearnBtn) {
            heroLearnBtn.addEventListener('click', () => {
                this.addButtonRipple(heroLearnBtn);
                this.smoothScrollToSection('technology');
            });
        }

        // Animated gesture preview
        if (gesturePreview) {
            this.startGesturePreviewAnimation();
        }
    }

    startGesturePreviewAnimation() {
        const gestures = ['👋', '🙏', '🤲', '👍', '🤟'];
        const words = ['Hello', 'Thanks', 'Please', 'Yes', 'Love'];
        const speeches = [
            '"Hello! Nice to meet you!"',
            '"Thank you so much!"',
            '"Please, if you would"',
            '"Yes, absolutely!"',
            '"I love you"'
        ];

        let index = 0;
        setInterval(() => {
            const gestureVisual = document.querySelector('.gesture-visual');
            const gestureText = document.querySelector('.gesture-text');
            const speechText = document.querySelector('.speech-text');

            if (gestureVisual && gestureText && speechText) {
                gestureVisual.textContent = gestures[index];
                gestureText.textContent = words[index];
                speechText.textContent = speeches[index];
                
                // Add animation
                gestureVisual.style.animation = 'none';
                gestureVisual.offsetHeight; // Trigger reflow
                gestureVisual.style.animation = 'wave 2s ease-in-out infinite';
            }

            index = (index + 1) % gestures.length;
        }, 4000);
    }

    addButtonRipple(button) {
        const ripple = button.querySelector('.btn-ripple');
        if (!ripple) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const rippleElement = document.createElement('div');
        rippleElement.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        ripple.appendChild(rippleElement);

        setTimeout(() => {
            rippleElement.remove();
        }, 600);
    }

    // ============ FEATURES SECTION ============
    initializeFeaturesSection() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceFeatureCard(card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetFeatureCard(card);
            });

            // Feature demo buttons
            const demoBtn = card.querySelector('.feature-demo-btn button');
            if (demoBtn) {
                demoBtn.addEventListener('click', () => {
                    this.triggerFeatureDemo(card);
                });
            }
        });
    }

    enhanceFeatureCard(card) {
        const icon = card.querySelector('.feature-icon');
        const glow = card.querySelector('.icon-glow');
        
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
        
        if (glow) {
            glow.style.opacity = '0.6';
        }
    }

    resetFeatureCard(card) {
        const icon = card.querySelector('.feature-icon');
        const glow = card.querySelector('.icon-glow');
        
        if (icon) {
            icon.style.transform = '';
        }
        
        if (glow) {
            glow.style.opacity = '0';
        }
    }

    triggerFeatureDemo(card) {
        const feature = card.getAttribute('data-feature');
        
        switch (feature) {
            case 'recognition':
                this.smoothScrollToSection('demo');
                break;
            case 'speech':
                this.demonstrateSpeechSynthesis();
                break;
            case 'listening':
                this.demonstrateVoiceRecognition();
                break;
            case 'privacy':
                this.showPrivacyInfo();
                break;
            default:
                this.showNotification('Feature demo coming soon!', 'info');
        }
    }

    demonstrateSpeechSynthesis() {
        const text = "This is a demonstration of our natural speech synthesis technology.";
        this.speakText(text);
        this.showNotification('Speech synthesis demo started', 'success', {
            title: 'Natural Speech'
        });
    }

    demonstrateVoiceRecognition() {
        this.showNotification('Voice recognition demo - speak now!', 'info', {
            title: 'Voice Input',
            duration: 3000
        });
        // Would trigger voice recognition if available
    }

    showPrivacyInfo() {
        this.showNotification('All processing happens locally in your browser', 'success', {
            title: '100% Private',
            duration: 5000
        });
    }

    // ============ TECHNOLOGY SECTION ============
    initializeTechnologySection() {
        const flowSteps = document.querySelectorAll('.flow-step');
        
        flowSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                this.activateFlowStep(step, index);
            });

            step.addEventListener('mouseleave', () => {
                this.deactivateFlowStep(step);
            });
        });

        // Auto-animate flow
        this.startFlowAnimation();
    }

    activateFlowStep(step, index) {
        step.classList.add('active');
        
        // Add sequential activation
        const allSteps = document.querySelectorAll('.flow-step');
        allSteps.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('active');
            }
        });
    }

    deactivateFlowStep(step) {
        // Don't deactivate immediately for better UX
        setTimeout(() => {
            if (!step.matches(':hover')) {
                step.classList.remove('active');
            }
        }, 500);
    }

    startFlowAnimation() {
        const steps = document.querySelectorAll('.flow-step');
        let currentStep = 0;

        setInterval(() => {
            steps.forEach(step => step.classList.remove('active'));
            
            if (steps[currentStep]) {
                steps[currentStep].classList.add('active');
            }

            currentStep = (currentStep + 1) % steps.length;
        }, 3000);
    }

    // ============ DEMO SECTION ============
    initializeDemoSection() {
        const startCameraBtn = document.getElementById('startCameraBtn');
        const stopCameraBtn = document.getElementById('stopCameraBtn');
        const speakBtn = document.getElementById('speakBtn');
        const micBtn = document.getElementById('micBtn');
        const clearChatBtn = document.getElementById('clearChatBtn');
        const volumeSlider = document.querySelector('.volume-slider');

        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', () => this.startCamera());
        }

        if (stopCameraBtn) {
            stopCameraBtn.addEventListener('click', () => this.stopCamera());
        }

        if (speakBtn) {
            speakBtn.addEventListener('click', () => this.speakCurrentGesture());
        }

        if (micBtn) {
            micBtn.addEventListener('click', () => this.toggleMicrophone());
        }

        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', () => this.clearChatMessages());
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        // Initialize gesture guide interactions
        this.initializeGestureGuide();

        // Try to initialize MediaPipe and camera
        this.initializeMediaPipe();
    }

    async initializeMediaPipe() {
        try {
            if (typeof Hands !== 'undefined') {
                this.hands = new Hands({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                    }
                });

                this.hands.setOptions({
                    maxNumHands: 2,
                    modelComplexity: 1,
                    minDetectionConfidence: 0.7,
                    minTrackingConfidence: 0.5
                });

                this.hands.onResults((results) => this.onHandsResults(results));
                console.log('MediaPipe Hands initialized successfully');
            } else {
                console.warn('MediaPipe not available, using fallback gesture recognition');
            }
        } catch (error) {
            console.error('Failed to initialize MediaPipe:', error);
        }
    }

    async startCamera() {
        try {
            this.showLoadingIndicator('Initializing camera...');

            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const videoElement = document.getElementById('videoElement');
            const canvasElement = document.getElementById('canvasElement');
            const cameraContainer = document.querySelector('.camera-container');

            if (videoElement && canvasElement) {
                videoElement.srcObject = stream;
                videoElement.style.display = 'block';
                canvasElement.style.display = 'block';

                await new Promise((resolve) => {
                    videoElement.onloadedmetadata = resolve;
                });

                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;

                // Initialize camera for MediaPipe
                if (this.hands && typeof Camera !== 'undefined') {
                    this.camera = new Camera(videoElement, {
                        onFrame: async () => {
                            if (this.hands && this.isRecognitionActive) {
                                await this.hands.send({ image: videoElement });
                            }
                        },
                        width: 640,
                        height: 480
                    });

                    this.camera.start();
                } else {
                    this.startFallbackGestureDetection();
                }

                // Update UI
                cameraContainer?.classList.add('active');
                document.getElementById('startCameraBtn')?.classList.add('hidden');
                document.getElementById('stopCameraBtn')?.classList.remove('hidden');
                
                this.updateCameraStatus('Camera Active', 'video', true);
                this.updateRecognitionStatus(true);

                this.isRecognitionActive = true;
                this.hideLoadingIndicator();

                this.addChatMessage('system', 'Camera started successfully! Show gestures to begin recognition.', 'video');
                this.showNotification('Camera activated successfully', 'success');
            }

        } catch (error) {
            console.error('Camera initialization failed:', error);
            this.hideLoadingIndicator();
            
            let message = 'Failed to access camera. ';
            if (error.name === 'NotAllowedError') {
                message += 'Please allow camera permissions.';
            } else if (error.name === 'NotFoundError') {
                message += 'No camera found.';
            } else {
                message += 'Please check your camera settings.';
            }

            this.updateCameraStatus('Camera Error', 'camera-off', false);
            this.showNotification(message, 'error', { duration: 6000 });
        }
    }

    stopCamera() {
        try {
            const videoElement = document.getElementById('videoElement');
            const canvasElement = document.getElementById('canvasElement');
            const cameraContainer = document.querySelector('.camera-container');

            if (videoElement?.srcObject) {
                const tracks = videoElement.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
            }

            if (this.camera) {
                this.camera.stop();
                this.camera = null;
            }

            // Update UI
            if (videoElement) videoElement.style.display = 'none';
            if (canvasElement) canvasElement.style.display = 'none';
            
            cameraContainer?.classList.remove('active');
            document.getElementById('startCameraBtn')?.classList.remove('hidden');
            document.getElementById('stopCameraBtn')?.classList.add('hidden');

            this.updateCameraStatus('Camera Ready', 'camera-off', false);
            this.updateRecognitionStatus(false);
            this.clearCurrentGesture();

            this.isRecognitionActive = false;

            this.addChatMessage('system', 'Camera stopped.', 'camera-off');
            this.showNotification('Camera deactivated', 'info');

        } catch (error) {
            console.error('Error stopping camera:', error);
        }
    }

    startFallbackGestureDetection() {
        const gestures = Object.keys(this.gestureTemplates);
        
        setInterval(() => {
            if (!this.isRecognitionActive) return;

            const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
            const confidence = 0.6 + Math.random() * 0.4;

            this.updateCurrentGesture(randomGesture, confidence);

            setTimeout(() => {
                if (Math.random() > 0.3) {
                    this.clearCurrentGesture();
                }
            }, 2000 + Math.random() * 2000);
        }, 3000 + Math.random() * 3000);
    }

    onHandsResults(results) {
        if (!this.isRecognitionActive) return;

        const canvasElement = document.getElementById('canvasElement');
        if (!canvasElement) return;

        const ctx = canvasElement.getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.multiHandLandmarks?.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
                this.drawHandLandmarks(ctx, landmarks);
            }
            this.recognizeGesture(results.multiHandLandmarks[0]);
        } else {
            this.clearCurrentGesture();
        }

        ctx.restore();
    }

    drawHandLandmarks(ctx, landmarks) {
        // Draw connections
        ctx.strokeStyle = '#00FF7F';
        ctx.lineWidth = 2;
        
        // Draw landmark points
        ctx.fillStyle = '#FF6B6B';
        landmarks.forEach(landmark => {
            const x = landmark.x * ctx.canvas.width;
            const y = landmark.y * ctx.canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    recognizeGesture(landmarks) {
        if (!landmarks || landmarks.length < 21) return;

        const gesture = this.classifyGesture(landmarks);
        if (gesture && gesture.confidence > 0.6) {
            this.updateCurrentGesture(gesture.name, gesture.confidence);
        } else {
            this.clearCurrentGesture();
        }
    }

    classifyGesture(landmarks) {
        // Simplified gesture classification
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];

        const thumbMcp = landmarks[2];
        const indexMcp = landmarks[5];
        const middleMcp = landmarks[9];
        const ringMcp = landmarks[13];
        const pinkyMcp = landmarks[17];

        const fingersUp = [
            thumbTip.y < thumbMcp.y,
            indexTip.y < indexMcp.y - 0.02,
            middleTip.y < middleMcp.y - 0.02,
            ringTip.y < ringMcp.y - 0.02,
            pinkyTip.y < pinkyMcp.y - 0.02
        ];

        const upCount = fingersUp.filter(Boolean).length;

        // Enhanced gesture recognition
        if (upCount >= 4) {
            return { name: 'hello', confidence: 0.85 };
        } else if (fingersUp[0] && !fingersUp[1] && !fingersUp[2] && !fingersUp[3] && !fingersUp[4]) {
            return { name: 'yes', confidence: 0.8 };
        } else if (!fingersUp[0] && fingersUp[1] && fingersUp[2] && !fingersUp[3] && !fingersUp[4]) {
            return { name: 'thanks', confidence: 0.75 };
        } else if (upCount === 0) {
            return { name: 'no', confidence: 0.7 };
        } else if (fingersUp[1] && fingersUp[4] && fingersUp[0]) {
            return { name: 'love', confidence: 0.85 };
        } else if (upCount === 2 || upCount === 3) {
            return { name: 'please', confidence: 0.65 };
        }

        return null;
    }

    updateCurrentGesture(gestureName, confidence) {
        const template = this.gestureTemplates[gestureName];
        if (!template) return;

        const currentGesture = document.getElementById('currentGesture');
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceValue = document.getElementById('confidenceValue');

        if (currentGesture) {
            currentGesture.innerHTML = `
                <div class="gesture-result">
                    <div class="gesture-emoji" style="font-size: 3rem; margin-bottom: 1rem;">${template.emoji}</div>
                    <div class="gesture-name" style="font-size: 1.5rem; font-weight: 600; color: var(--primary-600);">${template.name}</div>
                </div>
            `;
        }

        const confidencePercent = Math.round(confidence * 100);
        if (confidenceFill) confidenceFill.style.width = `${confidencePercent}%`;
        if (confidenceValue) confidenceValue.textContent = `${confidencePercent}%`;

        // Enable speak button if confidence is high enough
        const speakBtn = document.getElementById('speakBtn');
        if (speakBtn) {
            speakBtn.disabled = confidence < 0.7;
        }

        this.currentGesture = gestureName;
        this.currentConfidence = confidence;
    }

    clearCurrentGesture() {
        const currentGesture = document.getElementById('currentGesture');
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceValue = document.getElementById('confidenceValue');
        const speakBtn = document.getElementById('speakBtn');

        if (currentGesture) {
            currentGesture.innerHTML = `
                <div class="gesture-placeholder">
                    <i data-lucide="hand"></i>
                    <p>Show a gesture to start recognition</p>
                </div>
            `;
        }

        if (confidenceFill) confidenceFill.style.width = '0%';
        if (confidenceValue) confidenceValue.textContent = '0%';
        if (speakBtn) speakBtn.disabled = true;

        this.currentGesture = null;
        this.currentConfidence = 0;

        // Refresh icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateCameraStatus(message, icon, isActive) {
        const cameraStatus = document.getElementById('cameraStatus');
        if (cameraStatus) {
            cameraStatus.innerHTML = `
                <div class="status-icon">
                    <i data-lucide="${icon}"></i>
                </div>
                <h4>${message}</h4>
                <p>${isActive ? 'Recognition active - show gestures!' : 'Click "Start Camera" to begin'}</p>
            `;

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    updateRecognitionStatus(isActive) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = statusDot?.nextElementSibling;

        if (statusDot) {
            statusDot.classList.toggle('active', isActive);
        }

        if (statusText) {
            statusText.textContent = isActive ? 'Active' : 'Inactive';
        }
    }

    speakCurrentGesture() {
        if (!this.currentGesture || !this.gestureTemplates[this.currentGesture]) {
            this.showNotification('No gesture detected', 'warning');
            return;
        }

        const template = this.gestureTemplates[this.currentGesture];
        this.speakText(template.speech);
        
        this.addChatMessage('gesture', `${template.emoji} ${template.name}: "${template.speech}"`, 'volume-2');
        this.showNotification(`Speaking: "${template.speech}"`, 'success');

        // Update stats
        this.gestureCount++;
        this.updateDemoStats();
    }

    speakText(text) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = this.currentVolume || 0.8;
            speechSynthesis.speak(utterance);
        }
    }

    toggleMicrophone() {
        // Simplified microphone toggle for demo
        const micBtn = document.getElementById('micBtn');
        const isActive = micBtn?.classList.contains('mic-active');

        if (isActive) {
            this.stopMicrophone();
        } else {
            this.startMicrophone();
        }
    }

    startMicrophone() {
        const micBtn = document.getElementById('micBtn');
        if (micBtn) {
            micBtn.classList.add('mic-active');
            micBtn.innerHTML = '<i data-lucide="mic-off"></i> <span>Stop Listening</span>';
        }

        this.addChatMessage('system', 'Microphone activated - speak now!', 'mic');
        this.showNotification('Microphone activated', 'success');

        // Simulate speech recognition for demo
        setTimeout(() => {
            this.addChatMessage('speech', 'Hello, this is a test of speech recognition!', 'mic');
        }, 3000);
    }

    stopMicrophone() {
        const micBtn = document.getElementById('micBtn');
        if (micBtn) {
            micBtn.classList.remove('mic-active');
            micBtn.innerHTML = '<i data-lucide="mic"></i> <span>Voice Input</span>';
        }

        this.addChatMessage('system', 'Microphone deactivated.', 'mic-off');
        this.showNotification('Microphone deactivated', 'info');
    }

    setVolume(volume) {
        this.currentVolume = volume;
    }

    initializeGestureGuide() {
        const gestureItems = document.querySelectorAll('.gesture-item');
        
        gestureItems.forEach(item => {
            item.addEventListener('click', () => {
                const gestureName = item.querySelector('h4')?.textContent?.toLowerCase();
                const gestureKey = Object.keys(this.gestureTemplates).find(key =>
                    this.gestureTemplates[key].name.toLowerCase().includes(gestureName)
                );

                if (gestureKey && this.gestureTemplates[gestureKey]) {
                    this.speakText(this.gestureTemplates[gestureKey].speech);
                    this.showNotification(`Demonstrating: ${this.gestureTemplates[gestureKey].name}`, 'info');
                }
            });
        });
    }

    addChatMessage(type, message, icon) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${type}-message`;
        messageEl.innerHTML = `
            <div class="message-icon">
                <i data-lucide="${icon}"></i>
            </div>
            <div class="message-content">
                <div class="message-type">${this.capitalizeFirst(type)}</div>
                <p class="message-text">${message}</p>
                <div class="message-time">${timestamp}</div>
            </div>
        `;

        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Refresh icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Limit message count
        const messages = chatMessages.querySelectorAll('.chat-message');
        if (messages.length > 50) {
            messages[0].remove();
        }
    }

    clearChatMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="system-message">
                    <i data-lucide="info"></i>
                    <p>Chat cleared. Start the camera and show gestures to begin translation.</p>
                </div>
            `;

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        this.gestureCount = 0;
        this.updateDemoStats();
    }

    updateDemoStats() {
        const gestureCountEl = document.getElementById('gestureCount');
        const averageConfidenceEl = document.getElementById('averageConfidence');

        if (gestureCountEl) {
            gestureCountEl.textContent = this.gestureCount;
        }

        if (averageConfidenceEl && this.currentConfidence) {
            const avgConfidence = Math.round(this.currentConfidence * 100);
            averageConfidenceEl.textContent = `${avgConfidence}%`;
        }
    }

    // ============ ANALYTICS SECTION ============
    initializeAnalyticsSection() {
        this.createUsageChart();
        this.createGesturesChart();
        this.initializeUsageMap();
        this.startAnalyticsUpdates();
    }

    createUsageChart() {
        if (typeof Chart === 'undefined') return;

        const ctx = document.getElementById('usageChart');
        if (!ctx) return;

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Active Users',
                data: [1200000, 1450000, 1680000, 1920000, 2100000, 2280000, 2400000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        };

        this.analytics.charts.usage = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.formatNumber(value)
                        }
                    }
                }
            }
        });
    }

    createGesturesChart() {
        if (typeof Chart === 'undefined') return;

        const ctx = document.getElementById('gesturesChart');
        if (!ctx) return;

        const data = {
            labels: ['Hello', 'Thank You', 'Please', 'Yes', 'No', 'Others'],
            datasets: [{
                data: [32, 28, 18, 12, 6, 4],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
            }]
        };

        this.analytics.charts.gestures = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    initializeUsageMap() {
        const indicators = document.querySelectorAll('.usage-indicator');
        
        indicators.forEach(indicator => {
            const country = indicator.getAttribute('data-country');
            const users = indicator.getAttribute('data-users');
            
            indicator.addEventListener('mouseenter', () => {
                this.showMapTooltip(indicator, country, users);
            });

            indicator.addEventListener('mouseleave', () => {
                this.hideMapTooltip();
            });
        });
    }

    showMapTooltip(indicator, country, users) {
        // Create and show tooltip for map indicators
        const tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">${country}</div>
            <div class="tooltip-content">${users} active users</div>
        `;
        
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-3);
            font-size: var(--text-sm);
            box-shadow: var(--shadow-lg);
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(tooltip);
        
        const rect = indicator.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        this.currentTooltip = tooltip;
    }

    hideMapTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    startAnalyticsUpdates() {
        // Update analytics data every 30 seconds
        setInterval(() => {
            this.updateAnalyticsData();
        }, 30000);
    }

    updateAnalyticsData() {
        // Simulate real-time data updates
        const counters = document.querySelectorAll('.animate-counter');
        counters.forEach(counter => {
            const currentValue = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = Math.floor(Math.random() * 100) + 1;
            const newValue = currentValue + increment;
            
            this.animateCounterTo(counter, newValue);
        });
    }

    animateCounterTo(element, target) {
        const current = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const increment = (target - current) / 30;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const value = Math.floor(current + (increment * step));
            element.textContent = this.formatNumber(value);

            if (step >= 30) {
                clearInterval(timer);
                element.textContent = this.formatNumber(target);
            }
        }, 50);
    }

    // ============ TESTIMONIALS SECTION ============
    initializeTestimonialsSection() {
        const track = document.getElementById('testimonialsTrack');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dots = document.querySelectorAll('.testimonials-dots .dot');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTestimonial());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTestimonial());
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToTestimonial(index));
        });

        // Auto-advance testimonials
        this.startTestimonialsAutoPlay();
    }

    nextTestimonial() {
        const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
        this.testimonialIndex = (this.testimonialIndex + 1) % totalTestimonials;
        this.updateTestimonialsDisplay();
    }

    previousTestimonial() {
        const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
        this.testimonialIndex = (this.testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
        this.updateTestimonialsDisplay();
    }

    goToTestimonial(index) {
        this.testimonialIndex = index;
        this.updateTestimonialsDisplay();
    }

    updateTestimonialsDisplay() {
        const track = document.getElementById('testimonialsTrack');
        const dots = document.querySelectorAll('.testimonials-dots .dot');

        if (track) {
            const translateX = -this.testimonialIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.testimonialIndex);
        });
    }

    startTestimonialsAutoPlay() {
        setInterval(() => {
            this.nextTestimonial();
        }, 8000);
    }

    // ============ PRICING SECTION ============
    initializePricingSection() {
        const pricingToggle = document.getElementById('pricingToggle');
        const pricingBtns = document.querySelectorAll('.pricing-btn');

        if (pricingToggle) {
            pricingToggle.addEventListener('click', () => {
                this.togglePricingPeriod();
            });
        }

        pricingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.closest('.pricing-card').querySelector('h3').textContent;
                this.handlePricingAction(plan, btn);
            });
        });
    }

    togglePricingPeriod() {
        const toggle = document.getElementById('pricingToggle');
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const annualPrices = document.querySelectorAll('.annual-price');

        if (toggle) {
            const isAnnual = toggle.classList.contains('active');
            
            if (isAnnual) {
                // Switch to monthly
                toggle.classList.remove('active');
                monthlyPrices.forEach(price => price.classList.remove('hidden'));
                annualPrices.forEach(price => price.classList.add('hidden'));
            } else {
                // Switch to annual
                toggle.classList.add('active');
                monthlyPrices.forEach(price => price.classList.add('hidden'));
                annualPrices.forEach(price => price.classList.remove('hidden'));
            }
        }
    }

    handlePricingAction(plan, button) {
        this.addButtonRipple(button);

        switch (plan.toLowerCase()) {
            case 'personal':
                this.showNotification('Redirecting to free signup...', 'info');
                break;
            case 'professional':
                this.showNotification('Starting 14-day free trial...', 'success');
                break;
            case 'enterprise':
                this.smoothScrollToSection('contact');
                break;
        }
    }

    // ============ CONTACT SECTION ============
    initializeContactSection() {
        const contactForm = document.getElementById('contactForm');
        const liveChatBtn = document.getElementById('liveChatBtn');
        const sendAnotherBtn = document.getElementById('sendAnotherBtn');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmission(e));
        }

        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => this.openLiveChat());
        }

        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', () => this.resetContactForm());
        }

        // Real-time form validation
        this.initializeFormValidation();
    }

    initializeFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let isValid = true;
        let message = '';

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value || value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    message = 'Please select a subject';
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    isValid = false;
                    message = 'Message must be at least 10 characters';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = 'var(--color-error)';
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.style.cssText = `
            color: var(--color-error);
            font-size: var(--text-sm);
            margin-top: var(--space-1);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        `;
        error.innerHTML = `
            <i data-lucide="alert-circle" style="width: 14px; height: 14px;"></i>
            <span>${message}</span>
        `;

        field.parentNode.appendChild(error);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }

    async handleContactSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fix the form errors', 'error');
            return;
        }

        // Show loading state
        this.setFormLoading(true);

        try {
            // Simulate API call
            await this.delay(2000);
            
            // Show success
            this.showContactSuccess();
            this.showNotification('Message sent successfully!', 'success', {
                title: 'Thank You',
                duration: 5000
            });

        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            this.setFormLoading(false);
        }
    }

    setFormLoading(loading) {
        const submitBtn = document.querySelector('.form-submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoader = submitBtn?.querySelector('.btn-loader');

        if (submitBtn) {
            submitBtn.disabled = loading;
        }

        if (btnText && btnLoader) {
            if (loading) {
                btnText.classList.add('hidden');
                btnLoader.classList.remove('hidden');
            } else {
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
            }
        }
    }

    showContactSuccess() {
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');

        if (form && success) {
            form.classList.add('hidden');
            success.classList.remove('hidden');
        }
    }

    resetContactForm() {
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');

        if (form && success) {
            form.classList.remove('hidden');
            success.classList.add('hidden');
            form.reset();
            
            // Clear any field errors
            const errors = form.querySelectorAll('.field-error');
            errors.forEach(error => error.remove());
            
            const fields = form.querySelectorAll('input, textarea, select');
            fields.forEach(field => {
                field.style.borderColor = '';
            });
        }
    }

    openLiveChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatWindow = document.getElementById('chatWindow');

        if (chatWidget && chatWindow) {
            chatWindow.classList.remove('hidden');
            this.showNotification('Live chat activated', 'success');
        }
    }

    // ============ ACCESSIBILITY FEATURES ============
    initializeAccessibilityFeatures() {
        const accessibilityToggle = document.getElementById('accessibilityToggle');
        const accessibilityPanel = document.getElementById('accessibilityPanel');
        const controls = document.querySelectorAll('#accessibilityPanel input[type="checkbox"]');

        if (accessibilityToggle && accessibilityPanel) {
            accessibilityToggle.addEventListener('click', () => {
                accessibilityPanel.classList.toggle('hidden');
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!accessibilityToggle.contains(e.target) && !accessibilityPanel.contains(e.target)) {
                    accessibilityPanel.classList.add('hidden');
                }
            });
        }

        controls.forEach(control => {
            control.addEventListener('change', (e) => {
                this.handleAccessibilityToggle(e.target.id, e.target.checked);
            });
        });

        // Keyboard navigation
        this.initializeKeyboardNavigation();
    }

    handleAccessibilityToggle(feature, enabled) {
        const body = document.body;

        switch (feature) {
            case 'highContrast':
                body.classList.toggle('high-contrast', enabled);
                break;
            case 'largeText':
                body.classList.toggle('large-text', enabled);
                break;
            case 'reduceMotion':
                body.classList.toggle('reduce-motion', enabled);
                break;
            case 'screenReader':
                body.classList.toggle('screen-reader', enabled);
                break;
        }

        this.showNotification(`${this.capitalizeFirst(feature)} ${enabled ? 'enabled' : 'disabled'}`, 'info');
    }

    initializeKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip links for keyboard navigation
            if (e.key === 'Tab' && e.target === document.body) {
                const firstFocusable = document.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }

            // Escape key handlers
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    handleEscapeKey() {
        // Close any open modals, menus, etc.
        const mobileNav = document.getElementById('mobileNav');
        const languageMenu = document.getElementById('languageMenu');
        const accessibilityPanel = document.getElementById('accessibilityPanel');
        const chatWindow = document.getElementById('chatWindow');

        if (mobileNav?.classList.contains('active')) {
            this.closeMobileMenu();
        }

        if (languageMenu?.classList.contains('active')) {
            languageMenu.classList.remove('active');
        }

        if (!accessibilityPanel?.classList.contains('hidden')) {
            accessibilityPanel.classList.add('hidden');
        }

        if (!chatWindow?.classList.contains('hidden')) {
            chatWindow.classList.add('hidden');
        }
    }

    // ============ CHAT WIDGET ============
    initializeChatWidget() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        if (chatToggle && chatWindow) {
            chatToggle.addEventListener('click', () => {
                chatWindow.classList.toggle('hidden');
                if (!chatWindow.classList.contains('hidden')) {
                    chatInput?.focus();
                }
            });
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatWindow?.classList.add('hidden');
            });
        }

        if (chatSend && chatInput) {
            chatSend.addEventListener('click', () => this.sendChatMessage());
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        // Initialize chat with welcome message
        this.initializeChatMessages();
    }

    initializeChatMessages() {
        const chatMessages = document.getElementById('chatWidgetMessages');
        if (chatMessages && chatMessages.children.length === 1) {
            // Add typing indicator after welcome message
            setTimeout(() => {
                this.addChatTypingIndicator();
                setTimeout(() => {
                    this.removeChatTypingIndicator();
                    this.addBotMessage("Feel free to ask me anything about Sign2Speech! I can help with features, pricing, or technical questions.");
                }, 2000);
            }, 1000);
        }
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput?.value.trim();

        if (!message) return;

        this.addUserMessage(message);
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            this.addChatTypingIndicator();
            setTimeout(() => {
                this.removeChatTypingIndicator();
                this.addBotMessage(this.generateBotResponse(message));
            }, 1500);
        }, 500);
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chatWidgetMessages');
        if (!chatMessages) return;

        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message user';
        messageEl.innerHTML = `
            <div class="message-avatar" style="background: var(--primary-500);">You</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;

        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addBotMessage(message) {
        const chatMessages = document.getElementById('chatWidgetMessages');
        if (!chatMessages) return;

        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message bot';
        messageEl.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;

        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addChatTypingIndicator() {
        const chatMessages = document.getElementById('chatWidgetMessages');
        if (!chatMessages) return;

        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;

        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeChatTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            return "Our pricing is designed to be accessible for everyone! We offer a free Personal plan, Professional at $19/month, and custom Enterprise solutions. Would you like to know more about any specific plan?";
        } else if (lowerMessage.includes('demo') || lowerMessage.includes('try')) {
            return "You can try our live demo right here on the website! Just scroll down to the Demo section and click 'Start Camera' to see real-time gesture recognition in action.";
        } else if (lowerMessage.includes('accuracy') || lowerMessage.includes('how good')) {
            return "Sign2Speech achieves 99.7% accuracy with sub-50ms processing speed! Our AI models are trained on millions of gestures and continuously improve over time.";
        } else if (lowerMessage.includes('languages') || lowerMessage.includes('support')) {
            return "We support 15 different sign languages including ASL, BSL, JSL, and many others. The system also works with 25 different voice synthesis options.";
        } else if (lowerMessage.includes('privacy') || lowerMessage.includes('secure')) {
            return "Privacy is our top priority! All processing happens locally in your browser - no data ever leaves your device. We're SOC 2 Type II certified and fully GDPR compliant.";
        } else {
            return "Thank you for your question! I'm here to help with anything about Sign2Speech. You can also contact our support team directly for more detailed assistance.";
        }
    }

    // ============ NOTIFICATION SYSTEM ============
    initializeNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notificationContainer')) {
            const container = document.createElement('div');
            container.id = 'notificationContainer';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info', options = {}) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        notification.innerHTML = `
            <div class="notification-icon">
                <i data-lucide="${icons[type]}"></i>
            </div>
            <div class="notification-content">
                ${options.title ? `<div class="notification-title">${options.title}</div>` : ''}
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i data-lucide="x"></i>
            </button>
        `;

        container.appendChild(notification);

        // Refresh icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn?.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto-hide
        const duration = options.duration || 4000;
        if (duration > 0) {
            setTimeout(() => {
                this.hideNotification(notification);
            }, duration);
        }
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ============ LOADING SYSTEM ============
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
            this.updateLoadingProgress(0);
            
            // Simulate loading progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                this.updateLoadingProgress(progress);
            }, 200);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            this.updateLoadingProgress(100);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    updateLoadingProgress(progress) {
        const progressBar = document.getElementById('loadingProgress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    showLoadingIndicator(message = 'Loading...') {
        // Implementation for inline loading indicators
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = message;
        }
    }

    hideLoadingIndicator() {
        // Hide any inline loading indicators
    }

    // ============ REAL-TIME UPDATES ============
    startRealTimeUpdates() {
        // Update various components in real-time
        setInterval(() => {
            this.updateRealTimeData();
        }, 5000);

        // Update analytics every minute
        setInterval(() => {
            this.updateAnalyticsData();
        }, 60000);
    }

    updateRealTimeData() {
        // Simulate real-time updates
        const onlineUsers = document.querySelector('.map-stat .map-dot.active + span');
        if (onlineUsers) {
            const current = parseInt(onlineUsers.textContent.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 200) - 100;
            const newValue = Math.max(2000000, current + change);
            onlineUsers.textContent = `${(newValue / 1000000).toFixed(1)}M users online`;
        }
    }

    // ============ UTILITY FUNCTIONS ============
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    // ============ ERROR HANDLING ============
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`An error occurred: ${error.message}`, 'error');
    }

    // ============ PERFORMANCE MONITORING ============
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`Performance: ${name} took ${end - start} milliseconds`);
        return result;
    }
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Initialize the application
const app = new Sign2SpeechApp();

// Export for external access
window.Sign2SpeechApp = app;