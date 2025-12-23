// ========================================
// GLOBAL VARIABLES
// ========================================
let popupShown = false;
let currentPage = 1;
const coursesPerPage = 6;
let currentCategory = 'all';
let currentSearchTerm = '';
let filteredCourses = [];
let autocompleteItems = [];

// ========================================
// COURSE DATA
// ========================================
const coursesData = [
    {
        id: 1,
        title: "Full Stack Web Development",
        description: "Master MERN stack, build real projects, and become a full-stack developer.",
        icon: "💻",
        category: "development",
        duration: "12 Weeks",
        format: "Live Classes",
        badge: "Trending",
        difficulty: "Intermediate"
    },
    {
        id: 2,
        title: "Data Science & Analytics",
        description: "Learn Python, machine learning, and data visualization with industry datasets.",
        icon: "📊",
        category: "data-science",
        duration: "16 Weeks",
        format: "Live Classes",
        badge: "Popular",
        difficulty: "Advanced"
    },
    {
        id: 3,
        title: "Cloud Computing (AWS/Azure)",
        description: "Become a certified cloud architect with hands-on AWS and Azure training.",
        icon: "☁️",
        category: "cloud",
        duration: "10 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Intermediate"
    },
    {
        id: 4,
        title: "Cybersecurity Essentials",
        description: "Master ethical hacking, network security, and incident response techniques.",
        icon: "🔒",
        category: "security",
        duration: "14 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Advanced"
    },
    {
        id: 5,
        title: "UI/UX Design",
        description: "Design stunning user experiences with Figma, prototyping, and user research.",
        icon: "🎨",
        category: "design",
        duration: "8 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Beginner"
    },
    {
        id: 6,
        title: "Mobile App Development",
        description: "Build iOS and Android apps with React Native and Flutter frameworks.",
        icon: "📱",
        category: "development",
        duration: "12 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Intermediate"
    },
    {
        id: 7,
        title: "Digital Marketing",
        description: "Master SEO, social media, content marketing, and analytics.",
        icon: "📈",
        category: "business",
        duration: "8 Weeks",
        format: "Live Classes",
        badge: "New",
        difficulty: "Beginner"
    },
    {
        id: 8,
        title: "AI & Machine Learning",
        description: "Learn Python, TensorFlow, and build intelligent applications.",
        icon: "🤖",
        category: "data-science",
        duration: "18 Weeks",
        format: "Live Classes",
        badge: "Hot",
        difficulty: "Advanced"
    },
    {
        id: 9,
        title: "Project Management",
        description: "Master Agile, Scrum methodologies and PMP certification prep.",
        icon: "💼",
        category: "business",
        duration: "10 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Intermediate"
    },
    {
        id: 10,
        title: "DevOps Engineering",
        description: "Learn Docker, Kubernetes, CI/CD pipelines and infrastructure automation.",
        icon: "⚙️",
        category: "cloud",
        duration: "14 Weeks",
        format: "Live Classes",
        badge: "Trending",
        difficulty: "Advanced"
    },
    {
        id: 11,
        title: "Blockchain Development",
        description: "Build decentralized applications with Ethereum and Solidity.",
        icon: "🔗",
        category: "development",
        duration: "16 Weeks",
        format: "Live Classes",
        badge: "New",
        difficulty: "Advanced"
    },
    {
        id: 12,
        title: "Python Programming",
        description: "Master Python from basics to advanced concepts with real-world projects.",
        icon: "🐍",
        category: "development",
        duration: "10 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Beginner"
    },
    {
        id: 13,
        title: "Business Analytics",
        description: "Learn data-driven decision making with SQL, Excel, and Tableau.",
        icon: "📉",
        category: "business",
        duration: "8 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Beginner"
    },
    {
        id: 14,
        title: "Game Development",
        description: "Create 2D and 3D games with Unity and C# programming.",
        icon: "🎮",
        category: "development",
        duration: "14 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Intermediate"
    },
    {
        id: 15,
        title: "Network Security",
        description: "Master network defense, firewalls, and intrusion detection systems.",
        icon: "🛡️",
        category: "security",
        duration: "12 Weeks",
        format: "Live Classes",
        badge: "",
        difficulty: "Intermediate"
    }
];

// Category mapping
const categoryNames = {
    'all': 'All Courses',
    'development': 'Development',
    'data-science': 'Data Science',
    'cloud': 'Cloud & DevOps',
    'security': 'Security',
    'design': 'Design',
    'business': 'Business'
};

// ========================================
// HEADER SCROLL EFFECT
// ========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobileMenuToggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobileMenuToggle');
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = toggle.contains(event.target);
    
    if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('mobileMenuToggle');
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.getElementById('nav');
            const toggle = document.getElementById('mobileMenuToggle');
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

function scrollToContact() {
    scrollToSection('contact');
}

// ========================================
// COURSES INITIALIZATION
// ========================================
function initCourses() {
    filteredCourses = [...coursesData];
    renderCoursesGrid();
    renderPagination();
    setupSearchAutocomplete();
}

// ========================================
// FILTER COURSES BY CATEGORY
// ========================================
function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    currentSearchTerm = '';
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Clear search input
    document.getElementById('courseSearch').value = '';
    
    // Hide autocomplete
    document.getElementById('autocompleteDropdown').classList.remove('active');
    
    // Apply filters
    applyFilters();
}

// ========================================
// FILTER COURSES BY SEARCH
// ========================================
function filterCourses() {
    const searchInput = document.getElementById('courseSearch');
    currentSearchTerm = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    
    if (currentSearchTerm === '') {
        document.getElementById('autocompleteDropdown').classList.remove('active');
    } else {
        updateAutocomplete();
    }
    
    applyFilters();
}

// ========================================
// APPLY ALL FILTERS
// ========================================
function applyFilters() {
    filteredCourses = coursesData.filter(course => {
        // Filter by category
        if (currentCategory !== 'all' && course.category !== currentCategory) {
            return false;
        }
        
        // Filter by search term
        if (currentSearchTerm !== '') {
            const matchesSearch = 
                course.title.toLowerCase().includes(currentSearchTerm) ||
                course.description.toLowerCase().includes(currentSearchTerm) ||
                course.category.toLowerCase().includes(currentSearchTerm) ||
                course.difficulty.toLowerCase().includes(currentSearchTerm);
            
            if (!matchesSearch) {
                return false;
            }
        }
        
        return true;
    });
    
    renderCoursesGrid();
    renderPagination();
}

// ========================================
// RENDER COURSES GRID
// ========================================
function renderCoursesGrid() {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    // Check if no results
    if (filteredCourses.length === 0) {
        coursesGrid.innerHTML = '';
        noResults.style.display = 'block';
        document.getElementById('pagination').style.display = 'none';
        return;
    }
    
    noResults.style.display = 'none';
    document.getElementById('pagination').style.display = 'flex';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
    
    // Clear grid
    coursesGrid.innerHTML = '';
    
    // Add courses to grid
    paginatedCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
    
    // Add animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-up');
        });
    }, 100);
}

// ========================================
// CREATE COURSE CARD
// ========================================
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.setAttribute('data-category', course.category);
    
    const categoryName = categoryNames[course.category] || course.category;
    
    card.innerHTML = `
        ${course.badge ? `<div class="course-badge">${course.badge}</div>` : ''}
        <span class="course-category-tag">${categoryName}</span>
        <div class="course-icon">${course.icon}</div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-meta">
            <span>⏱ ${course.duration}</span>
            <span>📚 ${course.format}</span>
            <span>📊 ${course.difficulty}</span>
        </div>
        <button class="course-btn" onclick="scrollToContact()">Enroll Now</button>
    `;
    
    return card;
}

// ========================================
// RENDER PAGINATION
// ========================================
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.innerHTML = '←';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    pagination.appendChild(prevBtn);
    
    // Page buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page with ellipsis if needed
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'pagination-btn';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => goToPage(1);
        pagination.appendChild(firstBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-dots';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pagination.appendChild(pageBtn);
    }
    
    // Last page with ellipsis if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-dots';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
        
        const lastBtn = document.createElement('button');
        lastBtn.className = 'pagination-btn';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => goToPage(totalPages);
        pagination.appendChild(lastBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.innerHTML = '→';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1);
    pagination.appendChild(nextBtn);
}

// ========================================
// GO TO SPECIFIC PAGE
// ========================================
function goToPage(page) {
    currentPage = page;
    renderCoursesGrid();
    renderPagination();
    
    // Scroll to courses section on mobile
    if (window.innerWidth <= 768) {
        scrollToSection('courses');
    }
}

// ========================================
// SEARCH AUTOCOMPLETE
// ========================================
function setupSearchAutocomplete() {
    const searchInput = document.getElementById('courseSearch');
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');
    
    // Handle input
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            autocompleteDropdown.classList.remove('active');
            return;
        }
        
        updateAutocomplete();
    });
    
    // Handle arrow keys
    searchInput.addEventListener('keydown', function(e) {
        const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
        let currentIndex = -1;
        
        // Find currently selected item
        items.forEach((item, index) => {
            if (item.classList.contains('selected')) {
                currentIndex = index;
                item.classList.remove('selected');
            }
        });
        
        // Handle arrow keys
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex].classList.add('selected');
            items[nextIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            items[prevIndex].classList.add('selected');
            items[prevIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selectedItem = autocompleteDropdown.querySelector('.autocomplete-item.selected');
            if (selectedItem) {
                const courseTitle = selectedItem.querySelector('span:first-child').textContent;
                searchInput.value = courseTitle;
                currentSearchTerm = courseTitle.toLowerCase();
                autocompleteDropdown.classList.remove('active');
                applyFilters();
            }
        } else if (e.key === 'Escape') {
            autocompleteDropdown.classList.remove('active');
        }
    });
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !autocompleteDropdown.contains(event.target)) {
            autocompleteDropdown.classList.remove('active');
        }
    });
}

// ========================================
// UPDATE AUTOCOMPLETE
// ========================================
function updateAutocomplete() {
    const searchTerm = currentSearchTerm.toLowerCase();
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');
    
    if (searchTerm === '') {
        autocompleteDropdown.classList.remove('active');
        return;
    }
    
    // Get unique course titles that match search
    const matchedCourses = coursesData.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm)
    );
    
    // Limit to 8 results
    const limitedResults = matchedCourses.slice(0, 8);
    
    if (limitedResults.length === 0) {
        autocompleteDropdown.classList.remove('active');
        return;
    }
    
    autocompleteDropdown.innerHTML = '';
    
    limitedResults.forEach(course => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = `
            <span>${course.title}</span>
            <span class="course-category">${categoryNames[course.category]}</span>
        `;
        
        item.addEventListener('click', function() {
            document.getElementById('courseSearch').value = course.title;
            currentSearchTerm = course.title.toLowerCase();
            autocompleteDropdown.classList.remove('active');
            applyFilters();
        });
        
        autocompleteDropdown.appendChild(item);
    });
    
    autocompleteDropdown.classList.add('active');
}

// ========================================
// RESET FILTERS
// ========================================
function resetFilters() {
    currentCategory = 'all';
    currentSearchTerm = '';
    currentPage = 1;
    
    // Reset UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
    
    document.getElementById('courseSearch').value = '';
    document.getElementById('autocompleteDropdown').classList.remove('active');
    
    // Apply filters
    applyFilters();
}

// ========================================
// FAQ ACCORDION
// ========================================
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// ========================================
// CONTACT FORM SUBMISSION
// ========================================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Create data object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Contact Form Submitted:', data);
    
    // Show success toast
    showToast();
    
    // Reset form
    form.reset();
}

// ========================================
// POPUP FORM SUBMISSION
// ========================================
function handlePopupSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Create data object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Popup Form Submitted:', data);
    
    // Show success toast
    showToast();
    
    // Close popup
    closePopup();
    
    // Reset form
    form.reset();
}

// ========================================
// POPUP MANAGEMENT
// ========================================
function showPopup() {
    if (!popupShown) {
        const popup = document.getElementById('contactPopup');
        popup.classList.add('show');
        popupShown = true;
        
        // Store in localStorage to prevent showing again
        localStorage.setItem('popupShown', 'true');
    }
}

function closePopup() {
    const popup = document.getElementById('contactPopup');
    popup.classList.remove('show');
}

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const popup = document.getElementById('contactPopup');
    if (event.target === popup) {
        closePopup();
    }
});

// Close popup with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Show popup after 10 seconds (only once per session)
window.addEventListener('load', function() {
    // Check if popup was already shown
    const hasShownPopup = localStorage.getItem('popupShown');
    
    if (!hasShownPopup) {
        setTimeout(function() {
            showPopup();
        }, 10000); // 10 seconds
    }
});

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast() {
    const toast = document.getElementById('successToast');
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements on page load
window.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .step-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initCourses();
    
    // Log page load
    console.log('🎓 EduConnect Landing Page Loaded Successfully!');
    console.log('✨ Features: Advanced course filtering, Search autocomplete, Pagination');
    console.log('🎨 Theme: Green accent (#8FEC78) with professional design');
});

// ========================================
// PREVENT FORM RESUBMISSION ON PAGE RELOAD
// ========================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}