/**
 * ====================================================================
 * BOOK BANK MANAGEMENT SYSTEM - APPLICATION CORE ENGINE
 * ====================================================================
 */

// ====================================================================
// 1. OBJECT-ORIENTED DATA MODELS (Class Diagram Fig. 9 & 17)
// ====================================================================

class User {
  constructor(userID, name, email, phone, address, role = 'student') {
    this.userID = userID;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.role = role;
  }
}

class Student extends User {
  constructor(userID, name, email, phone, address, rollNo, course, department = 'Information Technology', memberSince = 'Aug 2026') {
    super(userID, name, email, phone, address, 'student');
    this.rollNo = rollNo;
    this.course = course;
    this.department = department;
    this.memberSince = memberSince;
    this.status = 'Approved';
  }
}

class Admin extends User {
  constructor(userID, name, email, phone, address, empID) {
    super(userID, name, email, phone, address, 'admin');
    this.empID = empID;
  }
}

class Book {
  constructor(bookID, title, author, publisher, edition, quantity, category, department = 'General', description = '') {
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.edition = edition;
    this.quantity = quantity;
    this.available = quantity;
    this.category = category;
    this.department = department;
    this.description = description;
  }

  isAvailable() {
    return this.available > 0;
  }
}

class Transaction {
  constructor(transactionID, studentRollNo, studentName, bookID, bookTitle, issueDate, dueDate, returnDate = null, status = 'Issued', fine = 0, paidFine = false) {
    this.transactionID = transactionID;
    this.studentRollNo = studentRollNo;
    this.studentName = studentName;
    this.bookID = bookID;
    this.bookTitle = bookTitle;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
    this.status = status;
    this.fine = fine;
    this.paidFine = paidFine;
  }

  calculateFine(finePerDay = 5) {
    if (this.status === 'Returned' && this.paidFine) return 0;
    const due = new Date(this.dueDate);
    const end = this.returnDate ? new Date(this.returnDate) : new Date();
    const diffTime = end - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return diffDays * finePerDay;
    }
    return 0;
  }

  getOverdueDays() {
    const due = new Date(this.dueDate);
    const end = this.returnDate ? new Date(this.returnDate) : new Date();
    const diffTime = end - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }
}

// ====================================================================
// 2. DEFAULT INITIAL DATA SEEDING (Matching SRS Document Screenshots)
// ====================================================================

const INITIAL_BOOKS = [
  {
    bookID: 101,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Scribner",
    edition: "Classic Reprint",
    quantity: 4,
    available: 4,
    category: "Fiction",
    department: "Humanities & Literature",
    description: "A 1925 novel following a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island."
  },
  {
    bookID: 102,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    publisher: "Bantam Books",
    edition: "Updated 10th Anniversary",
    quantity: 3,
    available: 3,
    category: "Science",
    department: "Physics & Astronomy",
    description: "A landmark book in science writing by one of the great minds of our time, exploring black holes, time travel, and the origins of the universe."
  },
  {
    bookID: 103,
    title: "Clean Code",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    edition: "1st Edition",
    quantity: 5,
    available: 3,
    category: "Technology",
    department: "Computer Science & Engineering",
    description: "A handbook of agile software craftsmanship with best practices on meaningful names, functions, formatting, and unit tests."
  },
  {
    bookID: 104,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    publisher: "Harper",
    edition: "1st Edition",
    quantity: 4,
    available: 4,
    category: "History",
    department: "Humanities & History",
    description: "Explores how biology and history have defined us and enhanced our understanding of what it means to be 'human'."
  },
  {
    bookID: 105,
    title: "Ways of Seeing",
    author: "John Berger",
    publisher: "Penguin Books",
    edition: "Special Edition",
    quantity: 2,
    available: 0,
    category: "Fiction",
    department: "Arts & Design",
    description: "Based on the BBC television series, examining how we look at art and visual culture through the lens of history and ideology."
  },
  {
    bookID: 106,
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    publisher: "MIT Press",
    edition: "4th Edition",
    quantity: 6,
    available: 5,
    category: "Technology",
    department: "Computer Science & Engineering",
    description: "Comprehensive textbook on modern computer algorithms covering dynamic programming, graph algorithms, and data structures."
  },
  {
    bookID: 107,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin",
    publisher: "John Wiley & Sons",
    edition: "10th Edition",
    quantity: 8,
    available: 7,
    category: "Engineering",
    department: "Information Technology",
    description: "The authoritative textbook covering process management, memory paging, file systems, distributed OS, and protection/security."
  },
  {
    bookID: 108,
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth",
    publisher: "McGraw-Hill",
    edition: "7th Edition",
    quantity: 5,
    available: 4,
    category: "Technology",
    department: "Information Technology",
    description: "Foundational database system concepts covering relational models, SQL, indexing, transaction processing, and database tuning."
  }
];

const STUDENT_ACCOUNTS = [
  ["25VV1A1201","AMPOLU SARVANI","sarvani.ampolu@gmail.com"],
  ["25VV1A1203","BANNA DEEKSHITHA","bannadeekshitha@gmail.com"],
  ["25VV1A1204","BATHULA ABHILASHA","bathulaabhilasha9@gmail.com"],
  ["25VV1A1205","BAVAJI CHANDRAKALA","bavajichandana@gmail.com"],
  ["25VV1A1206","BENDI HEMANTH","hemanthbendi8@gmail.com"],
  ["25VV1A1207","BONGU KUSUMA","kusumabongu41@gmail.com"],
  ["25VV1A1208","CHALLA SAMEERA","sameerachalla1921@gmail.com"],
  ["25VV1A1209","CHANDAKA ROHITH KUMAR","rohithkuma07s@gmail.com"],
  ["25VV1A1210","CHIPPADA JASWANTH","chippadajaswanth9@gmail.com"],
  ["25VV1A1211","CHODIPALLI SATYA","satyachodipalli55@gmail.com"],
  ["25VV1A1212","DALLI RAMA SRINU",""],
  ["25VV1A1213","DASUPURAM BHARATH KUMAR","dasupurambharathkumar@gmail.com"],
  ["25VV1A1214","DEVATHALA RAJESH","rajeshdevathala45@gmail.com"],
  ["25VV1A1215","DONKANA SARITHA","sarithadonkana15@gmail.com"],
  ["25VV1A1216","DUPPADA LOHITHA","lohithaduppada23@gmail.com"],
  ["25VV1A1217","DURU GANESH","duruganesh55@gmail.com"],
  ["25VV1A1219","JOGA JASWANTH YADAV","joga.jaswanth10.1@gmail.com"],
  ["25VV1A1220","KAGANA SRUTHI","sruthikagana154@gmail.com"],
  ["25VV1A1221","KATAPALLI DILEEP KUMAR","dileepkatapalli@gmail.com"],
  ["25VV1A1222","KOTA KARTHIK","kotakarthik626@gmail.com"],
  ["25VV1A1223","LAKE JAHNAVI","jahnavilake@gmail.com"],
  ["25VV1A1224","MAGUPALLI TEJASWANTH","tejaswanthmagupalli@gmail.com"],
  ["25VV1A1225","MAHANTHI NIHITH","nihithmahanthi@gmail.com"],
  ["25VV1A1226","MAJJI USHA RANI","usharanimajji8@gmail.com"],
  ["25VV1A1227","MEDISETTI PADMA SRI","padmasrim930@gmail.com"],
  ["25VV1A1228","MODALAVALASA TUSHIKA","modalavalasatushika@gmail.com"],
  ["25VV1A1229","MUDARAGEDDA JAYAPRAKASH","mudarageddajayaprakash2008@gmail.com"],
  ["25VV1A1230","MUDIDANA MEGH MANU VARSHITH","mmmvarshith07@gmail.com"],
  ["25VV1A1231","MUPPANA BINDU MADHURI","bindumuppana143@gmail.com"],
  ["25VV1A1232","MUTYALA ABHISHEK","abhishekmutyala128919@gmail.com"],
  ["25VV1A1233","NAGAM JASWANTH YADAV","nagamnani700@gmail.com"],
  ["25VV1A1234","NALLI JASWANTH","jaswanthn785@gmail.com"],
  ["25VV1A1235","NARTHU HASINI","hasininartu@gmail.com"],
  ["25VV1A1236","NUNNA ANITHA DEVI","anithanunna12@gmail.com"],
  ["25VV1A1238","PALLA HARSHITHA","harshithapalla869@gmail.com"],
  ["25VV1A1240","PEDANAYUNI HASINI","hasiniipedanayuni2211@gmail.com"],
  ["25VV1A1241","PEDAPATI RENUKA","renupedapati@gmail.com"],
  ["25VV1A1242","PILLI GNANESWARI","pillihyma@gmail.com"],
  ["25VV1A1243","PITTADA KEERTHANA","esskkeerthana@gmail.com"],
  ["25VV1A1244","PRASAD MARRI","prasadmarri368@gmail.com"],
  ["25VV1A1245","RELLA TULASI","tulasirella58@gmail.com"],
  ["25VV1A1246","ROUTHU MURALIDHAR","munnarouth2@gmail.com"],
  ["25VV1A1248","SAVARA SHARMILA","sharmilasavara26@gmail.com"],
  ["25VV1A1249","SEEPANA SYAMALARAO","syamalaraoseepana2008@gmail.com"],
  ["25VV1A1250","SHAIK JAHID","shaikjahid302@gmail.com"],
  ["25VV1A1251","SURISETTI DHEERAJ SATYA VIGNESH","dheeraj.surisetti@gmail.com"],
  ["25VV1A1252","SUVVARI KUMAR","kumar.jntugv@gmail.com"],
  ["25VV1A1253","TERLI AKHIL","akhilterli007@gmail.com"],
  ["25VV1A1254","VALETI JASWANTH","valetijaswanth5@gmail.com"],
  ["25VV1A1255","VANAPALLI MADHURIMA","vanapallimadhurima@gmail.com"],
  ["25VV1A1256","VEDURUPAKA VIJAY RISHI","vedurupakavijayrishi@gmail.com"],
  ["25VV1A1257","VITTANALA PUSHKARA HARSHA KUMAR","harshakumarvittanala@gmail.com"]
];

const INITIAL_STUDENTS = STUDENT_ACCOUNTS.map(([rollNo, name, email], index) => ({
  userID: index + 1,
  name,
  email,
  password: `${name}@${rollNo.slice(-4)}`,
  phone: "",
  address: "",
  rollNo,
  course: "B.Tech (Information Technology)",
  department: "Information Technology",
  memberSince: "Aug 2026",
  status: "Approved",
  outstandingFine: 0
}));

// Transactions pre-seeded for Academic Year starting August 2026:
// 1. NALLI JASWANTH (25VV1A1234) has 2 currently borrowed books:
//    - "Clean Code" -> Issued Aug 10, 2026 (Due Aug 25, 2026) -> Overdue
//    - "Ways of Seeing" -> Issued Aug 20, 2026 (Due Sep 05, 2026) -> Overdue
// 2. NAGAM JASWANTH YADAV (25VV1A1233) has 1 borrowed book:
//    - "Introduction to Algorithms (CLRS)" -> Issued Oct 10, 2026 (Due Oct 25, 2026)
// 3. MUTYALA ABHISHEK (25VV1A1232) returned:
//    - "Operating System Concepts" -> Returned on time Sep 15, 2026
// 4. NARTHU HASINI (25VV1A1235) has 1 borrowed book:
//    - "Database System Concepts" -> Issued Nov 01, 2026 (Due Nov 16, 2026)
const INITIAL_TRANSACTIONS = [
  {
    transactionID: 701,
    studentRollNo: "25VV1A1234",
    studentName: "NALLI JASWANTH",
    bookID: 103,
    bookTitle: "Clean Code",
    issueDate: "2026-08-10",
    dueDate: "2026-08-25",
    returnDate: null,
    status: "Issued",
    fine: 355,
    paidFine: false
  },
  {
    transactionID: 702,
    studentRollNo: "25VV1A1234",
    studentName: "NALLI JASWANTH",
    bookID: 105,
    bookTitle: "Ways of Seeing",
    issueDate: "2026-08-20",
    dueDate: "2026-09-05",
    returnDate: null,
    status: "Issued",
    fine: 300,
    paidFine: false
  },
  {
    transactionID: 703,
    studentRollNo: "25VV1A1233",
    studentName: "NAGAM JASWANTH YADAV",
    bookID: 106,
    bookTitle: "Introduction to Algorithms (CLRS)",
    issueDate: "2026-10-10",
    dueDate: "2026-10-25",
    returnDate: null,
    status: "Issued",
    fine: 50,
    paidFine: false
  },
  {
    transactionID: 704,
    studentRollNo: "25VV1A1232",
    studentName: "MUTYALA ABHISHEK",
    bookID: 107,
    bookTitle: "Operating System Concepts",
    issueDate: "2026-09-01",
    dueDate: "2026-09-16",
    returnDate: "2026-09-15",
    status: "Returned",
    fine: 0,
    paidFine: true
  },
  {
    transactionID: 705,
    studentRollNo: "25VV1A1235",
    studentName: "NARTHU HASINI",
    bookID: 108,
    bookTitle: "Database System Concepts",
    issueDate: "2026-11-01",
    dueDate: "2026-11-16",
    returnDate: null,
    status: "Issued",
    fine: 0,
    paidFine: false
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "overdue",
    title: "Book Overdue Alert",
    message: "Clean Code was due on 2026-08-25. Penalty of ₹5/day is accumulating.",
    date: "Aug 26, 2026",
    read: false
  },
  {
    id: 2,
    type: "info",
    title: "New Semester Arrivals",
    message: "Operating System Concepts 10th Edition and Database System Concepts are now cataloged.",
    date: "Sep 01, 2026",
    read: false
  },
  {
    id: 3,
    type: "overdue",
    title: "Outstanding Fine Notice",
    message: "Your total Book Bank overdue fine has reached ₹655. Settle at kiosk counter or online.",
    date: "Nov 04, 2026",
    read: false
  }
];

// ====================================================================
// 3. MAIN APPLICATION CONTROLLER
// ====================================================================

class BookBankApp {
  constructor() {
    this.currentView = 'login'; // Entry point matching Figure 1
    this.currentUserRole = 'student'; // 'student' | 'kiosk' | 'admin'
    this.selectedLoginRole = 'student';
    this.currentStudentRoll = '25VV1A1234'; // Active student context (NALLI JASWANTH)
    this.kioskSelectedRoll = '25VV1A1234';
    
    // Policy configs
    this.config = {
      maxBooksPerStudent: 3,
      finePerDay: 5,
      standardDurationDays: 15
    };

    this.auditLogs = [];
    
    this.initStorage();
    this.initEventListeners();
    this.renderAll();
    this.calculateCocomo();
    this.navigate('login');
    this.resetToGuestSession();
  }

  // LocalStorage Persistence
  initStorage() {
    if (!localStorage.getItem('bb_books')) {
      localStorage.setItem('bb_books', JSON.stringify(INITIAL_BOOKS));
    }
    if (!localStorage.getItem('bb_students')) {
      localStorage.setItem('bb_students', JSON.stringify(INITIAL_STUDENTS));
    }
    if (!localStorage.getItem('bb_transactions')) {
      localStorage.setItem('bb_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    }
    if (!localStorage.getItem('bb_notifications')) {
      localStorage.setItem('bb_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem('bb_config')) {
      localStorage.setItem('bb_config', JSON.stringify(this.config));
    } else {
      this.config = JSON.parse(localStorage.getItem('bb_config'));
    }

    // Synchronize the complete student roster while preserving passwords changed by students.
    try {
      let cachedStudents = JSON.parse(localStorage.getItem('bb_students')) || [];
      const initialRolls = INITIAL_STUDENTS.map(s => s.rollNo);
      const requiredInitialPasswordRolls = [
        '25VV1A1232',
        '25VV1A1233',
        '25VV1A1234',
        '25VV1A1235'
      ];
      const hasCompleteRoster = initialRolls.every(roll =>
        cachedStudents.some(s => s.rollNo === roll)
      );
      const hasLegacyRoster = cachedStudents.some(s =>
        s.name === 'Divya' || s.rollNo === '24VV1A1246'
      );

      const mergedStudents = INITIAL_STUDENTS.map(initialStudent => {
        const cachedStudent = cachedStudents.find(s => s.rollNo === initialStudent.rollNo);
        return cachedStudent
          ? {
              ...cachedStudent,
              ...initialStudent,
              password: requiredInitialPasswordRolls.includes(initialStudent.rollNo)
                ? initialStudent.password
                : (cachedStudent.password || initialStudent.password)
            }
          : initialStudent;
      });
      const extraStudents = cachedStudents.filter(s =>
        !initialRolls.includes(s.rollNo) && s.rollNo !== '24VV1A1246' && s.name !== 'Divya'
      );
      mergedStudents.push(...extraStudents);

      if (!hasCompleteRoster || hasLegacyRoster ||
          JSON.stringify(cachedStudents) !== JSON.stringify(mergedStudents)) {
        localStorage.setItem('bb_students', JSON.stringify(mergedStudents));
      }

      if (hasLegacyRoster) {
        localStorage.setItem('bb_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
        localStorage.setItem('bb_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
      }

      let cachedTxs = JSON.parse(localStorage.getItem('bb_transactions')) || [];
      const hasPreJulyDates = cachedTxs.some(t => t.issueDate && (t.issueDate.startsWith('2024') || t.issueDate < '2026-08-01' || t.studentRollNo === '24VV1A1246'));
      if (hasPreJulyDates || cachedTxs.length === 0) {
        localStorage.setItem('bb_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
        localStorage.setItem('bb_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
      }
    } catch (e) {
      console.warn("Storage sync check:", e);
    }

    this.logAudit("BookBank System engine initialized successfully.");
  }

  getBooks() {
    return JSON.parse(localStorage.getItem('bb_books')) || [];
  }
  saveBooks(books) {
    localStorage.setItem('bb_books', JSON.stringify(books));
  }

  getStudents() {
    return JSON.parse(localStorage.getItem('bb_students')) || [];
  }
  saveStudents(students) {
    localStorage.setItem('bb_students', JSON.stringify(students));
  }

  getTransactions() {
    return JSON.parse(localStorage.getItem('bb_transactions')) || [];
  }
  saveTransactions(transactions) {
    localStorage.setItem('bb_transactions', JSON.stringify(transactions));
  }

  getNotifications() {
    return JSON.parse(localStorage.getItem('bb_notifications')) || [];
  }
  saveNotifications(notifs) {
    localStorage.setItem('bb_notifications', JSON.stringify(notifs));
  }

  logAudit(message, type = "INFO") {
    const time = new Date().toLocaleTimeString();
    const entry = `[${time}] [${type}] ${message}`;
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 50) this.auditLogs.pop();
    this.renderAuditLogs();
    this.renderKioskFeed(time, message, type);
  }

  // Navigation
  navigate(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-link').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (viewName === 'catalog') this.filterCatalog();
    if (viewName === 'dashboard') this.renderStudentDashboard();
    if (viewName === 'kiosk') this.renderKioskView();
    if (viewName === 'admin') this.renderAdminView();
  }

  // Role Switching & Profile
  switchRole(role) {
    this.currentUserRole = role;
    this.closeUserMenu();
    const navbar = document.getElementById('mainNavbar');
    if (navbar) navbar.style.display = 'block';

    const pillName = document.getElementById('userPillName');
    const pillRole = document.getElementById('userPillRole');
    const pillAvatar = document.getElementById('userAvatarText');
    const dropName = document.getElementById('dropdownUserName');
    const dropEmail = document.getElementById('dropdownUserEmail');

    if (role === 'student') {
      const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll) || this.getStudents()[0];
      if (pillName) pillName.textContent = student.name;
      if (pillRole) pillRole.textContent = `Student (${student.rollNo})`;
      if (pillAvatar) pillAvatar.textContent = student.name.charAt(0);
      if (dropName) dropName.textContent = `${student.name} (${student.rollNo})`;
      if (dropEmail) dropEmail.textContent = student.email;
      this.renderStudentDashboard();
    } else if (role === 'kiosk') {
      if (pillName) pillName.textContent = "Kiosk Station 1";
      if (pillRole) pillRole.textContent = "Operator Mode";
      if (pillAvatar) pillAvatar.textContent = "K";
      if (dropName) dropName.textContent = "Kiosk Station #1";
      if (dropEmail) dropEmail.textContent = "kiosk.operator@college.edu";
    } else if (role === 'admin') {
      if (pillName) pillName.textContent = "Administrator";
      if (pillRole) pillRole.textContent = "Head Librarian";
      if (pillAvatar) pillAvatar.textContent = "A";
      if (dropName) dropName.textContent = "Head Librarian (Admin)";
      if (dropEmail) dropEmail.textContent = "admin.librarian@college.edu";
    }
  }

  resetToGuestSession() {
    this.isLoggedIn = false;
    const navbar = document.getElementById('mainNavbar');
    if (navbar) navbar.style.display = 'none';
    const pillName = document.getElementById('userPillName');
    const pillRole = document.getElementById('userPillRole');
    const pillAvatar = document.getElementById('userAvatarText');
    const dropName = document.getElementById('dropdownUserName');
    const dropEmail = document.getElementById('dropdownUserEmail');
    if (pillName) pillName.textContent = 'Guest User';
    if (pillRole) pillRole.textContent = 'Not Logged In';
    if (pillAvatar) pillAvatar.textContent = '?';
    if (dropName) dropName.textContent = 'Guest User';
    if (dropEmail) dropEmail.textContent = 'Sign in to access your portal';
  }

  logout() {
    this.closeUserMenu();
    this.selectedLoginRole = 'student';
    const emailInput = document.getElementById('mainLoginEmail');
    const pwdInput = document.getElementById('mainLoginPassword');
    if (emailInput) {
      emailInput.value = '';
      emailInput.placeholder = 'Enter Roll No (e.g. 25VV1A1234) or Email';
    }
    if (pwdInput) {
      pwdInput.value = '';
    }
    const errBox = document.getElementById('loginErrorAlert');
    if (errBox) errBox.style.display = 'none';

    this.resetToGuestSession();
    this.showToast('You have been logged out successfully.', 'info');
    this.logAudit('User session terminated (logged out).', 'INFO');
    this.navigate('login');
  }

  openUserMenu() {
    const menu = document.getElementById('userDropdownMenu');
    menu.classList.toggle('show');
  }
  closeUserMenu() {
    const menu = document.getElementById('userDropdownMenu');
    if (menu) menu.classList.remove('show');
  }

  toggleNotifDropdown() {
    const dropdown = document.getElementById('notifDropdown');
    dropdown.classList.toggle('show');
    this.renderNotifDropdown();
  }

  markNotificationsRead() {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    this.saveNotifications(notifs);
    this.renderNotifDropdown();
    this.updateNotifBadges();
    this.showToast("All notifications marked as read", "info");
  }

  updateNotifBadges() {
    const unread = this.getNotifications().filter(n => !n.read).length;
    const badge = document.getElementById('navNotifCount');
    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
    const panelCount = document.getElementById('notifPanelCount');
    if (panelCount) {
      panelCount.textContent = `${this.getNotifications().length} Alerts`;
    }
  }

  renderNotifDropdown() {
    const list = document.getElementById('notifDropdownList');
    const notifs = this.getNotifications();
    if (!notifs.length) {
      list.innerHTML = `<div style="padding:16px; text-align:center; color:#94a3b8;">No notifications</div>`;
      return;
    }
    list.innerHTML = notifs.map(n => `
      <div class="notif-item ${!n.read ? 'unread' : ''}">
        <div style="font-size:1.1rem;">${n.type === 'overdue' ? '⚠️' : '📘'}</div>
        <div style="flex:1;">
          <div style="font-weight:700; font-size:0.88rem;">${n.title}</div>
          <div style="font-size:0.8rem; color:#64748b;">${n.message}</div>
          <small style="font-size:0.72rem; color:#94a3b8;">${n.date}</small>
        </div>
      </div>
    `).join('');
  }

  // ====================================================================
  // 4. HOME PAGE INTERACTIONS (Figure 2)
  // ====================================================================
  handleHeroSearch(event) {
    if (event.key === 'Enter') {
      this.executeHeroSearch();
    }
  }

  executeHeroSearch() {
    const q = document.getElementById('heroSearchInput').value.trim();
    if (!q) {
      this.navigate('catalog');
      return;
    }
    this.navigate('catalog');
    const catSearch = document.getElementById('catalogSearchInput');
    if (catSearch) {
      catSearch.value = q;
      this.filterCatalog();
    }
  }

  filterByCategory(cat) {
    this.navigate('catalog');
    const select = document.getElementById('catalogCategoryFilter');
    if (select) {
      select.value = cat;
      this.filterCatalog();
    }
  }

  updateCategoryCounts() {
    const books = this.getBooks();
    const count = cat => books.filter(b => b.category === cat).length;
    
    const f = document.getElementById('catCountFiction');
    const s = document.getElementById('catCountScience');
    const t = document.getElementById('catCountTech');
    const h = document.getElementById('catCountHistory');

    if (f) f.textContent = `${count('Fiction')} Books`;
    if (s) s.textContent = `${count('Science')} Books`;
    if (t) t.textContent = `${count('Technology')} Books`;
    if (h) h.textContent = `${count('History')} Books`;
  }

  // ====================================================================
  // 5. CATALOG VIEW (Figure 3)
  // ====================================================================
  filterCatalog() {
    const query = (document.getElementById('catalogSearchInput')?.value || '').toLowerCase().trim();
    const category = document.getElementById('catalogCategoryFilter')?.value || 'All';
    const availFilter = document.getElementById('catalogAvailabilityFilter')?.value || 'All';
    const sortVal = document.getElementById('catalogSortFilter')?.value || 'titleAsc';

    let books = this.getBooks();

    // Text Search
    if (query) {
      books = books.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.publisher.toLowerCase().includes(query) ||
        String(b.bookID).includes(query)
      );
    }

    // Category Filter
    if (category !== 'All') {
      books = books.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    // Availability Filter
    if (availFilter === 'Available') {
      books = books.filter(b => b.available > 0);
    } else if (availFilter === 'Issued') {
      books = books.filter(b => b.available === 0);
    }

    // Sorting
    if (sortVal === 'titleAsc') {
      books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortVal === 'titleDesc') {
      books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortVal === 'authorAsc') {
      books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortVal === 'quantityDesc') {
      books.sort((a, b) => b.available - a.available);
    }

    this.renderCatalogGrid(books);
  }

  renderCatalogGrid(books) {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    if (books.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="color:#1e1b4b; margin-bottom:8px;">No Books Found</h3>
          <p style="color:#64748b;">Try adjusting your search criteria or category filter.</p>
          <button class="btn btn-primary" style="margin-top:16px;" onclick="document.getElementById('catalogSearchInput').value=''; document.getElementById('catalogCategoryFilter').value='All'; app.filterCatalog();">Clear Filters</button>
        </div>
      `;
      return;
    }

    // Render cards matching exact design of Figure 3
    grid.innerHTML = books.map(book => {
      const isAvail = book.available > 0;
      const statusClass = isAvail ? 'available' : 'issued';
      const statusLabel = isAvail ? `Available (${book.available}/${book.quantity})` : 'Out of Stock / Issued';

      return `
        <div class="book-card">
          <div class="book-cover-box">
            <span class="book-cat-tag">${book.category}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>

          <h3 class="book-card-title">${book.title}</h3>
          <p class="book-card-author">by ${book.author}</p>
          
          <div class="book-card-meta">
            <span>${book.publisher}</span>
            <span>${book.edition}</span>
          </div>

          <div style="margin-bottom: 14px;">
            <span class="avail-pill ${statusClass}">
              <span class="avail-dot"></span>
              ${statusLabel}
            </span>
          </div>

          <div class="book-card-actions">
            <button class="btn btn-secondary btn-card-details btn-sm" onclick="app.openBookDetailsModal(${book.bookID})">
              View Details
            </button>
            <button class="btn btn-primary btn-sm" onclick="app.reserveOrBorrowDirect(${book.bookID})" ${!isAvail ? 'disabled' : ''}>
              ${isAvail ? 'Reserve Book' : 'Waitlist'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ====================================================================
  // 6. STUDENT DASHBOARD (Figure 4)
  // ====================================================================
  renderStudentDashboard() {
    const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll) || this.getStudents()[0];
    const transactions = this.getTransactions().filter(t => t.studentRollNo === student.rollNo);

    // Active loans (Status == 'Issued')
    const activeLoans = transactions.filter(t => t.status === 'Issued');
    const returnedLoans = transactions.filter(t => t.status === 'Returned');
    
    // Calculate overdues & fines dynamically
    let overdueCount = 0;
    let totalFine = 0;

    activeLoans.forEach(loan => {
      const overdueDays = loan.getOverdueDays ? loan.getOverdueDays() : (new Transaction(loan.transactionID, loan.studentRollNo, loan.studentName, loan.bookID, loan.bookTitle, loan.issueDate, loan.dueDate, loan.returnDate, loan.status, loan.fine, loan.paidFine).getOverdueDays());
      if (overdueDays > 0) {
        overdueCount++;
        totalFine += (overdueDays * this.config.finePerDay);
      }
    });

    // Update Stats matching Figure 4
    const sIssued = document.getElementById('statBooksIssued');
    const sReading = document.getElementById('statCurrentlyReading');
    const sReturned = document.getElementById('statBooksReturned');
    const sOverdue = document.getElementById('statOverdue');

    if (sIssued) sIssued.textContent = activeLoans.length;
    if (sReading) sReading.textContent = activeLoans.length;
    if (sReturned) sReturned.textContent = returnedLoans.length;
    if (sOverdue) sOverdue.textContent = overdueCount;

    // Profile Details
    const nameEl = document.getElementById('dashStudentName');
    const memEl = document.getElementById('dashMemberSince');
    if (nameEl) nameEl.textContent = student.name;
    if (memEl) memEl.textContent = `Member since ${student.memberSince} • Roll: ${student.rollNo}`;

    // Render Currently Borrowed List matching Figure 4
    const borrowedContainer = document.getElementById('currentlyBorrowedList');
    if (borrowedContainer) {
      if (activeLoans.length === 0) {
        borrowedContainer.innerHTML = `
          <div style="padding:20px; text-align:center; color:#64748b; background:#f8fafc; border-radius:8px;">
            You have no active book loans. Browse the catalog to borrow textbooks!
          </div>
        `;
      } else {
        borrowedContainer.innerHTML = activeLoans.map(loan => {
          const txObj = new Transaction(loan.transactionID, loan.studentRollNo, loan.studentName, loan.bookID, loan.bookTitle, loan.issueDate, loan.dueDate, loan.returnDate, loan.status, loan.fine, loan.paidFine);
          const overdueDays = txObj.getOverdueDays();
          const fineAmount = overdueDays * this.config.finePerDay;

          // Figure 4 has red tags like "Overdue by 514 days"
          const badgeHtml = overdueDays > 0 
            ? `<span class="badge-overdue">Overdue by ${overdueDays} days</span>`
            : `<span class="badge-on-time">Due on ${loan.dueDate}</span>`;

          return `
            <div class="borrowed-item">
              <div class="item-left">
                <div class="item-book-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <div class="item-meta">
                  <h4>${loan.bookTitle}</h4>
                  <p>Tx #${loan.transactionID} • Issued: ${loan.issueDate} • Due: ${loan.dueDate}</p>
                  ${overdueDays > 0 ? `<p style="color:#e11d48; font-weight:600; font-size:0.78rem;">Late Fine: ₹${fineAmount} (₹${this.config.finePerDay}/day)</p>` : ''}
                </div>
              </div>

              <div>
                ${badgeHtml}
              </div>

              <div class="item-actions">
                <button class="btn btn-outline-sm" onclick="app.openExtensionModal(${loan.transactionID})" title="Request 7-14 days extension">
                  Extend Due Date
                </button>
                <button class="btn btn-secondary-sm" onclick="app.openReceiptModal(${loan.transactionID})" title="View Issue Receipt Slip">
                  Slip
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Fines Box
    const fineText = document.getElementById('totalFinesAmount');
    if (fineText) fineText.textContent = `₹${totalFine.toLocaleString()}`;

    // Notifications List matching Figure 4: "Book Due Soon", "New Book Available"
    const dashNotifList = document.getElementById('dashboardNotifList');
    if (dashNotifList) {
      const notifs = this.getNotifications();
      dashNotifList.innerHTML = notifs.map(n => `
        <div class="notif-card-item ${n.type === 'overdue' ? 'alert-overdue' : 'alert-info'}">
          <div class="notif-card-title">${n.title}</div>
          <div class="notif-card-desc">${n.message}</div>
          <div class="notif-card-date">${n.date}</div>
        </div>
      `).join('');
    }

    // Complete Student History Table
    const historyTableBody = document.getElementById('studentHistoryTableBody');
    if (historyTableBody) {
      if (transactions.length === 0) {
        historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:#94a3b8;">No borrowing history on record.</td></tr>`;
      } else {
        historyTableBody.innerHTML = transactions.map(t => {
          const isReturned = t.status === 'Returned';
          const statusBadge = isReturned 
            ? `<span class="badge badge-success">Returned</span>` 
            : `<span class="badge badge-danger">Active Loan</span>`;
          
          return `
            <tr>
              <td><strong>#${t.transactionID}</strong></td>
              <td>${t.bookTitle}</td>
              <td>${t.issueDate}</td>
              <td>${t.dueDate}</td>
              <td>${t.returnDate || '<span style="color:#94a3b8;">Not Returned</span>'}</td>
              <td><strong>₹${t.fine}</strong> ${t.paidFine ? '<span style="color:#10b981;">(Paid)</span>' : '<span style="color:#ef4444;">(Pending)</span>'}</td>
              <td>${statusBadge}</td>
              <td>
                <button class="btn btn-outline-sm" onclick="app.openReceiptModal(${t.transactionID})">View Receipt</button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // ====================================================================
  // 7. KIOSK OPERATOR STATION (SRS Section 6, 7, 10–14)
  // ====================================================================
  renderKioskView() {
    this.kioskScanStudent();
    this.populateKioskIssueDropdown();
    this.renderKioskReturnList();
  }

  quickFillKioskId(roll) {
    const input = document.getElementById('kioskStudentIdInput');
    if (input) input.value = roll;
    this.kioskScanStudent();
  }

  kioskScanStudent() {
    const roll = document.getElementById('kioskStudentIdInput')?.value.trim();
    if (!roll) return;
    this.kioskSelectedRoll = roll;

    const student = this.getStudents().find(s => s.rollNo.toUpperCase() === roll.toUpperCase());
    const box = document.getElementById('kioskVerifiedStudentBox');
    if (!student) {
      if (box) {
        box.innerHTML = `
          <div style="color:#e11d48; padding:12px; font-weight:700;">
            ⚠️ Student with Roll No "${roll}" is not registered in Book Bank database.
            <button class="btn btn-outline-sm" style="margin-left:12px;" onclick="app.openNewStudentModal()">Register Now</button>
          </div>
        `;
      }
      return;
    }

    const txs = this.getTransactions().filter(t => t.studentRollNo === student.rollNo && t.status === 'Issued');
    const remainingQuota = this.config.maxBooksPerStudent - txs.length;

    let totalFine = 0;
    txs.forEach(t => {
      const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
      totalFine += txObj.calculateFine(this.config.finePerDay);
    });

    if (box) {
      box.innerHTML = `
        <div class="verified-badge-top">
          <span class="badge badge-success">✓ Student Verified & Authenticated</span>
          <span class="eligibility-status">Quota: ${remainingQuota} / ${this.config.maxBooksPerStudent} Remaining</span>
        </div>
        <div class="verified-body">
          <h4 id="kioskStudentName">${student.name} (${student.rollNo})</h4>
          <p><strong>Department:</strong> ${student.department} • <strong>Course:</strong> ${student.course}</p>
          <p><strong>Active Books:</strong> ${txs.length} • <strong class="${totalFine > 0 ? 'text-danger' : 'text-success'}">Overdue Fines:</strong> ₹${totalFine}</p>
        </div>
      `;
    }

    this.renderKioskReturnList();
  }

  populateKioskIssueDropdown() {
    const select = document.getElementById('kioskIssueBookSelect');
    if (!select) return;
    const books = this.getBooks().filter(b => b.available > 0);

    if (books.length === 0) {
      select.innerHTML = `<option value="">No books currently available in stock</option>`;
      return;
    }

    select.innerHTML = books.map(b => `
      <option value="${b.bookID}">[ID: ${b.bookID}] ${b.title} by ${b.author} (${b.available} copies available)</option>
    `).join('');
  }

  kioskProcessIssue() {
    const roll = this.kioskSelectedRoll;
    const student = this.getStudents().find(s => s.rollNo.toUpperCase() === roll.toUpperCase());
    if (!student) {
      this.showToast("Please scan or verify a valid student ID first", "danger");
      return;
    }

    const currentLoans = this.getTransactions().filter(t => t.studentRollNo === student.rollNo && t.status === 'Issued');
    if (currentLoans.length >= this.config.maxBooksPerStudent) {
      this.showToast(`Borrow limit reached! Student already has ${currentLoans.length} active books.`, "danger");
      return;
    }

    const bookSelect = document.getElementById('kioskIssueBookSelect');
    const bookId = parseInt(bookSelect?.value);
    if (!bookId) {
      this.showToast("Please select a book to issue", "danger");
      return;
    }

    const durationDays = parseInt(document.getElementById('kioskIssueDurationSelect')?.value || 15);

    const books = this.getBooks();
    const bookIndex = books.findIndex(b => b.bookID === bookId);
    if (bookIndex === -1 || books[bookIndex].available <= 0) {
      this.showToast("Selected book is currently out of stock", "danger");
      return;
    }

    // Decrement available copies
    books[bookIndex].available--;
    this.saveBooks(books);

    // Calculate dates
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + durationDays);

    const formatDate = d => d.toISOString().split('T')[0];

    const newTxId = Math.floor(100 + Math.random() * 900);
    const newTx = {
      transactionID: newTxId,
      studentRollNo: student.rollNo,
      studentName: student.name,
      bookID: bookId,
      bookTitle: books[bookIndex].title,
      issueDate: formatDate(today),
      dueDate: formatDate(dueDate),
      returnDate: null,
      status: "Issued",
      fine: 0,
      paidFine: false
    };

    const txs = this.getTransactions();
    txs.unshift(newTx);
    this.saveTransactions(txs);

    // Add notification
    const notifs = this.getNotifications();
    notifs.unshift({
      id: Date.now(),
      type: "info",
      title: "Book Issued at Kiosk",
      message: `"${books[bookIndex].title}" was successfully issued to ${student.name}. Due on ${newTx.dueDate}.`,
      date: formatDate(today),
      read: false
    });
    this.saveNotifications(notifs);

    this.logAudit(`Issued Book ID ${bookId} ("${books[bookIndex].title}") to Student ${student.rollNo} (Tx #${newTxId}).`, "SUCCESS");
    this.showToast(`Successfully issued "${books[bookIndex].title}"!`, "success");

    // Refresh UI
    this.renderAll();
    this.openReceiptModal(newTxId);
  }

  renderKioskReturnList() {
    const container = document.getElementById('kioskReturnContent');
    if (!container) return;

    const student = this.getStudents().find(s => s.rollNo.toUpperCase() === this.kioskSelectedRoll.toUpperCase());
    if (!student) {
      container.innerHTML = `<p style="color:#94a3b8; text-align:center;">Scan a student to view active books ready for return.</p>`;
      return;
    }

    const activeTxs = this.getTransactions().filter(t => t.studentRollNo === student.rollNo && t.status === 'Issued');
    if (activeTxs.length === 0) {
      container.innerHTML = `<div style="padding:16px; background:#f8fafc; text-align:center; color:#64748b; border-radius:8px;">No active books currently borrowed by ${student.name}.</div>`;
      return;
    }

    container.innerHTML = activeTxs.map(tx => {
      const txObj = new Transaction(tx.transactionID, tx.studentRollNo, tx.studentName, tx.bookID, tx.bookTitle, tx.issueDate, tx.dueDate, tx.returnDate, tx.status, tx.fine, tx.paidFine);
      const overdueDays = txObj.getOverdueDays();
      const fineAmount = overdueDays * this.config.finePerDay;

      return `
        <div class="return-row-item">
          <div class="return-details">
            <strong style="font-size:1.05rem;">${tx.bookTitle}</strong>
            <span style="font-size:0.82rem; color:#64748b;">Tx #${tx.transactionID} • Issued: ${tx.issueDate} • Due: ${tx.dueDate}</span>
            ${overdueDays > 0 ? `<span style="color:#e11d48; font-weight:700; font-size:0.85rem;">⚠️ Overdue by ${overdueDays} days! Fine: ₹${fineAmount}</span>` : '<span style="color:#10b981; font-weight:600; font-size:0.82rem;">✓ On Time (No Fine)</span>'}
          </div>

          <div style="display:flex; align-items:center; gap:10px;">
            <select id="returnCond_${tx.transactionID}" class="form-select" style="width:140px; padding:6px 10px;">
              <option value="Good">Condition: Good</option>
              <option value="MinorWear">Minor Wear</option>
              <option value="Damaged">Damaged (+₹100)</option>
            </select>

            <button class="btn btn-success-solid" onclick="app.kioskProcessReturn(${tx.transactionID})">
              Confirm Return
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  kioskProcessReturn(txId) {
    const txs = this.getTransactions();
    const txIndex = txs.findIndex(t => t.transactionID === txId);
    if (txIndex === -1) return;

    const tx = txs[txIndex];
    const txObj = new Transaction(tx.transactionID, tx.studentRollNo, tx.studentName, tx.bookID, tx.bookTitle, tx.issueDate, tx.dueDate, tx.returnDate, tx.status, tx.fine, tx.paidFine);
    const overdueDays = txObj.getOverdueDays();
    let calculatedFine = overdueDays * this.config.finePerDay;

    const condEl = document.getElementById(`returnCond_${txId}`);
    if (condEl && condEl.value === 'Damaged') {
      calculatedFine += 100;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // Restock book inventory
    const books = this.getBooks();
    const bIndex = books.findIndex(b => b.bookID === tx.bookID);
    if (bIndex !== -1) {
      if (books[bIndex].available < books[bIndex].quantity) {
        books[bIndex].available++;
        this.saveBooks(books);
      }
    }

    // Update transaction
    txs[txIndex].status = "Returned";
    txs[txIndex].returnDate = todayStr;
    txs[txIndex].fine = calculatedFine;
    txs[txIndex].paidFine = true; // Settled at kiosk return
    this.saveTransactions(txs);

    this.logAudit(`Book returned: "${tx.bookTitle}" from ${tx.studentName}. Overdue fine: ₹${calculatedFine} collected.`, "SUCCESS");
    this.showToast(`Returned "${tx.bookTitle}" successfully! Return slip generated.`, "success");

    this.renderAll();
    this.openReceiptModal(txId);
  }

  renderKioskFeed(time, msg, type) {
    const feed = document.getElementById('kioskLiveFeed');
    if (!feed) return;
    const typeClass = type === 'SUCCESS' ? 'success' : type === 'WARN' ? 'warn' : 'info';
    const row = document.createElement('div');
    row.className = 'feed-line';
    row.innerHTML = `<span class="time">[${time}]</span> <span class="${typeClass}">[${type}]</span> ${msg}`;
    feed.prepend(row);
  }

  // ====================================================================
  // 8. ADMIN CONTROL CENTER (SRS Section 5.2, 7.3, 11)
  // ====================================================================
  renderAdminView() {
    this.renderAdminInventoryTable();
    this.renderAdminUsersTable();
    this.renderAuditLogs();
    
    // Sync policy inputs
    const mBooks = document.getElementById('cfgMaxBooks');
    const fRate = document.getElementById('cfgFinePerDay');
    const sDays = document.getElementById('cfgStandardDays');
    if (mBooks) mBooks.value = this.config.maxBooksPerStudent;
    if (fRate) fRate.value = this.config.finePerDay;
    if (sDays) sDays.value = this.config.standardDurationDays;
  }

  switchAdminTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabName) btn.classList.add('active');
      else if (btn.dataset.tab) btn.classList.remove('active');
    });

    document.querySelectorAll('.admin-tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const target = document.getElementById(`adminTab-${tabName}`);
    if (target) target.classList.add('active');
  }

  renderAdminInventoryTable() {
    const tbody = document.getElementById('adminInventoryTableBody');
    if (!tbody) return;
    const books = this.getBooks();

    const badge = document.getElementById('adminTotalBooksBadge');
    if (badge) badge.textContent = `${books.length} Titles Listed`;

    tbody.innerHTML = books.map(b => {
      const statusPill = b.available > 0
        ? `<span class="badge badge-success">In Stock (${b.available})</span>`
        : `<span class="badge badge-danger">Out of Stock</span>`;

      return `
        <tr>
          <td><strong>#${b.bookID}</strong></td>
          <td>
            <strong>${b.title}</strong><br>
            <small style="color:#64748b;">${b.author}</small>
          </td>
          <td><span class="badge badge-info">${b.category}</span></td>
          <td>${b.publisher} (${b.edition})</td>
          <td>${b.quantity}</td>
          <td><strong>${b.available}</strong></td>
          <td>${statusPill}</td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-outline-sm" onclick="app.openEditBookModal(${b.bookID})">Edit</button>
              <button class="btn btn-secondary-sm text-danger" onclick="app.deleteBook(${b.bookID})">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderAdminUsersTable() {
    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;
    const students = this.getStudents();
    const txs = this.getTransactions();

    tbody.innerHTML = students.map(s => {
      const activeCount = txs.filter(t => t.studentRollNo === s.rollNo && t.status === 'Issued').length;
      let fineTotal = 0;
      txs.filter(t => t.studentRollNo === s.rollNo && t.status === 'Issued').forEach(t => {
        const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
        fineTotal += txObj.calculateFine(this.config.finePerDay);
      });

      return `
        <tr>
          <td><strong>${s.rollNo}</strong></td>
          <td>${s.name}</td>
          <td>${s.email}</td>
          <td>${s.department}</td>
          <td><span class="badge badge-purple">${activeCount} Books</span></td>
          <td><strong style="color:${fineTotal > 0 ? '#ef4444' : '#10b981'};">₹${fineTotal}</strong></td>
          <td><span class="badge badge-success">${s.status}</span></td>
          <td>
            <button class="btn btn-outline-sm" onclick="app.quickFillKioskId('${s.rollNo}'); app.navigate('kiosk');">Open at Kiosk</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderAuditLogs() {
    const box = document.getElementById('adminAuditLogBox');
    if (!box) return;
    box.innerHTML = this.auditLogs.map(l => `<div>${l}</div>`).join('');
  }

  saveLendingPolicies() {
    this.config.maxBooksPerStudent = parseInt(document.getElementById('cfgMaxBooks')?.value || 3);
    this.config.finePerDay = parseInt(document.getElementById('cfgFinePerDay')?.value || 5);
    this.config.standardDurationDays = parseInt(document.getElementById('cfgStandardDays')?.value || 15);

    localStorage.setItem('bb_config', JSON.stringify(this.config));
    this.logAudit(`Lending policies updated: Max books=${this.config.maxBooksPerStudent}, Fine=₹${this.config.finePerDay}/day.`, "INFO");
    this.showToast("Lending policies successfully updated!", "success");
    this.renderAll();
  }

  openAddBookModal() {
    document.getElementById('adminBookModalTitle').textContent = "Add New Book to Inventory";
    document.getElementById('editBookId').value = "";
    document.getElementById('admBookTitle').value = "";
    document.getElementById('admBookAuthor').value = "";
    document.getElementById('admBookPublisher').value = "";
    document.getElementById('admBookQuantity').value = "5";
    document.getElementById('admBookDept').value = "Computer Science";
    document.getElementById('admBookDesc').value = "";
    this.openModal('adminBookModal');
  }

  openEditBookModal(bookId) {
    const book = this.getBooks().find(b => b.bookID === bookId);
    if (!book) return;

    document.getElementById('adminBookModalTitle').textContent = `Edit Book #${book.bookID}`;
    document.getElementById('editBookId').value = book.bookID;
    document.getElementById('admBookTitle').value = book.title;
    document.getElementById('admBookAuthor').value = book.author;
    document.getElementById('admBookCategory').value = book.category;
    document.getElementById('admBookPublisher').value = `${book.publisher}, ${book.edition}`;
    document.getElementById('admBookQuantity').value = book.quantity;
    document.getElementById('admBookDept').value = book.department;
    document.getElementById('admBookDesc').value = book.description || "";
    this.openModal('adminBookModal');
  }

  handleSaveAdminBook(event) {
    event.preventDefault();
    const editId = document.getElementById('editBookId').value;
    const title = document.getElementById('admBookTitle').value.trim();
    const author = document.getElementById('admBookAuthor').value.trim();
    const category = document.getElementById('admBookCategory').value;
    const publisher = document.getElementById('admBookPublisher').value.trim();
    const quantity = parseInt(document.getElementById('admBookQuantity').value || 1);
    const department = document.getElementById('admBookDept').value.trim();
    const desc = document.getElementById('admBookDesc').value.trim();

    const books = this.getBooks();

    if (editId) {
      const idx = books.findIndex(b => b.bookID === parseInt(editId));
      if (idx !== -1) {
        books[idx].title = title;
        books[idx].author = author;
        books[idx].category = category;
        books[idx].publisher = publisher;
        books[idx].quantity = quantity;
        if (books[idx].available > quantity) books[idx].available = quantity;
        books[idx].department = department;
        books[idx].description = desc;
        this.saveBooks(books);
        this.logAudit(`Admin updated Book #${editId} ("${title}").`, "INFO");
        this.showToast(`Book #${editId} updated successfully`, "success");
      }
    } else {
      const newId = 100 + books.length + 1;
      const newBook = new Book(newId, title, author, publisher, "1st Edition", quantity, category, department, desc);
      books.push(newBook);
      this.saveBooks(books);
      this.logAudit(`Admin added new Book #${newId} ("${title}").`, "SUCCESS");
      this.showToast(`New book "${title}" added to inventory!`, "success");
    }

    this.closeModal('adminBookModal');
    this.renderAll();
  }

  deleteBook(bookId) {
    if (!confirm(`Are you sure you want to remove Book #${bookId} from the Book Bank?`)) return;
    let books = this.getBooks();
    const book = books.find(b => b.bookID === bookId);
    books = books.filter(b => b.bookID !== bookId);
    this.saveBooks(books);
    this.logAudit(`Admin removed Book #${bookId} ("${book ? book.title : ''}") from system.`, "WARN");
    this.showToast(`Book #${bookId} removed`, "info");
    this.renderAll();
  }

  // ====================================================================
  // 9. REPORT GENERATION ENGINE (SRS Section 7.3)
  // ====================================================================
  generateReport(type) {
    const display = document.getElementById('reportDisplayBox');
    if (!display) return;

    const books = this.getBooks();
    const students = this.getStudents();
    const txs = this.getTransactions();

    if (type === 'inventory') {
      display.innerHTML = `
        <div class="panel-header-action">
          <h4>1. Book Inventory & Real-Time Stock Report</h4>
          <button class="btn btn-outline-sm" onclick="app.exportReportCSV('inventory')">Download CSV</button>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Total Stock</th>
                <th>Available Copies</th>
                <th>Lent Copies</th>
              </tr>
            </thead>
            <tbody>
              ${books.map(b => `
                <tr>
                  <td><strong>#${b.bookID}</strong></td>
                  <td>${b.title}</td>
                  <td>${b.author}</td>
                  <td>${b.category}</td>
                  <td>${b.quantity}</td>
                  <td><span class="badge ${b.available > 0 ? 'badge-success' : 'badge-danger'}">${b.available}</span></td>
                  <td>${b.quantity - b.available}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (type === 'defaulters') {
      // Find all overdue books
      const overdueTxs = txs.filter(t => {
        if (t.status === 'Returned') return false;
        const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
        return txObj.getOverdueDays() > 0;
      });

      display.innerHTML = `
        <div class="panel-header-action">
          <h4 style="color:#e11d48;">2. Defaulters & Overdue Books Report</h4>
          <button class="btn btn-outline-sm" onclick="app.exportReportCSV('defaulters')">Download CSV</button>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Days Overdue</th>
                <th>Accumulated Fine</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${overdueTxs.length === 0 ? `<tr><td colspan="8" style="text-align:center; padding:20px; color:#10b981;">No defaulters! All active loans are within deadline.</td></tr>` : 
                overdueTxs.map(t => {
                  const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
                  const days = txObj.getOverdueDays();
                  const fine = days * this.config.finePerDay;
                  return `
                    <tr>
                      <td><strong>${t.studentRollNo}</strong></td>
                      <td>${t.studentName}</td>
                      <td>${t.bookTitle}</td>
                      <td>${t.issueDate}</td>
                      <td>${t.dueDate}</td>
                      <td><span class="badge-overdue">${days} days</span></td>
                      <td><strong style="color:#e11d48;">₹${fine}</strong></td>
                      <td>
                        <button class="btn btn-danger-solid btn-sm" onclick="app.sendDefaulterReminder('${t.studentRollNo}', '${t.bookTitle}')">Send Reminder</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (type === 'lending') {
      display.innerHTML = `
        <div class="panel-header-action">
          <h4>3. All-Time Lending & Circulation Statistics</h4>
          <button class="btn btn-outline-sm" onclick="app.exportReportCSV('lending')">Download CSV</button>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Student</th>
                <th>Roll No</th>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${txs.map(t => `
                <tr>
                  <td>#${t.transactionID}</td>
                  <td>${t.studentName}</td>
                  <td>${t.studentRollNo}</td>
                  <td>${t.bookTitle}</td>
                  <td>${t.issueDate}</td>
                  <td>${t.dueDate}</td>
                  <td><span class="badge ${t.status === 'Returned' ? 'badge-success' : 'badge-danger'}">${t.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (type === 'fines') {
      let totalCollected = 0;
      let totalPending = 0;

      txs.forEach(t => {
        const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
        const curFine = txObj.calculateFine(this.config.finePerDay);
        if (t.paidFine) totalCollected += t.fine;
        else totalPending += curFine;
      });

      display.innerHTML = `
        <div class="panel-header-action">
          <h4>4. Fine Collection & Penalties Finance Report</h4>
          <button class="btn btn-outline-sm" onclick="app.exportReportCSV('fines')">Download CSV</button>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; padding:18px; border-radius:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:#065f46;">TOTAL FINES COLLECTED</span>
            <div style="font-size:1.8rem; font-weight:800; color:#047857;">₹${totalCollected.toLocaleString()}</div>
          </div>
          <div style="background:#fff1f2; border:1px solid #fecdd3; padding:18px; border-radius:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:#9f1239;">PENDING / UNPAID FINES</span>
            <div style="font-size:1.8rem; font-weight:800; color:#e11d48;">₹${totalPending.toLocaleString()}</div>
          </div>
        </div>
      `;
    }
  }

  sendDefaulterReminder(roll, book) {
    const notifs = this.getNotifications();
    notifs.unshift({
      id: Date.now(),
      type: "overdue",
      title: "URGENT: Overdue Book Reminder",
      message: `Administrator notice: "${book}" is overdue. Please return immediately to the Kiosk to avoid academic hold.`,
      date: new Date().toISOString().split('T')[0],
      read: false
    });
    this.saveNotifications(notifs);
    this.showToast(`Automated reminder sent to student ${roll}!`, "success");
    this.updateNotifBadges();
  }

  exportReportCSV(type) {
    let rows = [];
    if (type === 'inventory') {
      rows.push(["BookID", "Title", "Author", "Category", "TotalQuantity", "AvailableCopies"]);
      this.getBooks().forEach(b => rows.push([b.bookID, `"${b.title}"`, `"${b.author}"`, b.category, b.quantity, b.available]));
    } else if (type === 'defaulters') {
      rows.push(["RollNo", "StudentName", "BookTitle", "IssueDate", "DueDate", "OverdueDays", "FineAmount"]);
      this.getTransactions().forEach(t => {
        const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
        const days = txObj.getOverdueDays();
        if (days > 0) {
          rows.push([t.studentRollNo, `"${t.studentName}"`, `"${t.bookTitle}"`, t.issueDate, t.dueDate, days, days * this.config.finePerDay]);
        }
      });
    } else {
      rows.push(["TxID", "StudentName", "RollNo", "BookTitle", "IssueDate", "DueDate", "Status"]);
      this.getTransactions().forEach(t => rows.push([t.transactionID, `"${t.studentName}"`, t.studentRollNo, `"${t.bookTitle}"`, t.issueDate, t.dueDate, t.status]));
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BookBank_Report_${type}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast(`Report downloaded as CSV file.`, "info");
  }

  // ====================================================================
  // 10. MODALS & WORKFLOWS
  // ====================================================================

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  }

  setLoginRole(role) {
    this.selectedLoginRole = role;
    ['student', 'kiosk', 'admin'].forEach(r => {
      const btn = document.getElementById(`roleBtn-${r}`);
      if (btn) {
        if (r === role) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    const emailInput = document.getElementById('mainLoginEmail');
    const pwdInput = document.getElementById('mainLoginPassword');
    const errBox = document.getElementById('loginErrorAlert');
    const credentialHint = document.getElementById('loginCredentialHint');
    if (errBox) errBox.style.display = 'none';
    if (credentialHint) {
      if (role === 'admin') {
        credentialHint.textContent = 'Admin Login: Username admin | Password admin123';
        credentialHint.style.display = 'block';
      } else if (role === 'kiosk') {
        credentialHint.textContent = 'Kiosk Login: Username kiosk | Password kiosk123';
        credentialHint.style.display = 'block';
      } else {
        credentialHint.style.display = 'none';
        credentialHint.textContent = '';
      }
    }

    // Clear inputs - require user to enter correct credentials
    if (emailInput) {
      emailInput.value = '';
      if (role === 'student') {
        emailInput.placeholder = 'Enter Roll No (e.g. 25VV1A1234) or Email';
      } else if (role === 'kiosk') {
        emailInput.placeholder = 'Enter Kiosk Station ID (e.g. kiosk)';
      } else if (role === 'admin') {
        emailInput.placeholder = 'Enter Admin ID (e.g. admin)';
      }
      emailInput.focus();
    }
    if (pwdInput) {
      pwdInput.value = '';
      pwdInput.placeholder = 'Enter Password';
    }
  }

  fillDemoLogin(role) {
    this.setLoginRole(role);
  }

  processLogin(event) {
    event.preventDefault();
    const idInput = document.getElementById('mainLoginEmail')?.value.trim();
    const password = document.getElementById('mainLoginPassword')?.value.trim();
    const errBox = document.getElementById('loginErrorAlert');
    const errText = document.getElementById('loginErrorText');

    if (!idInput || !password) {
      if (errBox) {
        errBox.style.display = 'flex';
        errText.textContent = 'Please enter both your Roll Number / User ID and Password.';
      }
      return;
    }

    const role = this.selectedLoginRole || 'student';

    if (role === 'student') {
      const students = this.getStudents();
      const student = students.find(s => 
        (s.rollNo && s.rollNo.trim().toUpperCase() === idInput.toUpperCase()) ||
        (s.email && s.email.trim().toLowerCase() === idInput.toLowerCase()) ||
        (idInput.toLowerCase() === 'jaswanth.student@college.edu' && s.rollNo === '25VV1A1234')
      );

      if (!student) {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = `Student with Roll No / Email "${idInput}" not found in database. Please check credentials.`;
        }
        return;
      }

      const expectedPassword = student.password || `${student.name}@${student.rollNo.slice(-4)}`;
      if (password !== expectedPassword) {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = `Incorrect password for ${student.name} (${student.rollNo}). Please try again.`;
        }
        return;
      }

      if (errBox) errBox.style.display = 'none';
      this.currentStudentRoll = student.rollNo;
      this.switchRole('student');
      this.showToast(`Login successful! Welcome back, ${student.name} (${student.rollNo}).`, 'success');
      this.logAudit(`Student login authenticated: ${student.name} [${student.rollNo}]`, 'SUCCESS');
      this.navigate('dashboard');
      return;
    }

    if (role === 'kiosk') {
      const validIds = ['kiosk', 'kiosk1', 'kiosk.operator@college.edu', 'operator'];
      if (!validIds.includes(idInput.toLowerCase())) {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = `Invalid Kiosk Station ID "${idInput}". Use "kiosk" or "kiosk.operator@college.edu".`;
        }
        return;
      }

      if (password !== 'kiosk123') {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = 'Incorrect password for Kiosk Station. (Default: kiosk123)';
        }
        return;
      }

      if (errBox) errBox.style.display = 'none';
      this.switchRole('kiosk');
      this.showToast('Terminal Online. Logged in as Kiosk Station Operator.', 'success');
      this.logAudit('Kiosk Operator terminal session started', 'SUCCESS');
      this.navigate('kiosk');
      return;
    }

    if (role === 'admin') {
      const validIds = ['admin', 'librarian', 'admin.librarian@college.edu'];
      if (!validIds.includes(idInput.toLowerCase())) {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = `Invalid Admin ID "${idInput}". Use "admin" or "admin.librarian@college.edu".`;
        }
        return;
      }

      if (password !== 'admin123') {
        if (errBox) {
          errBox.style.display = 'flex';
          errText.textContent = 'Incorrect password for Administrator. (Default: admin123)';
        }
        return;
      }

      if (errBox) errBox.style.display = 'none';
      this.switchRole('admin');
      this.showToast('Welcome, Administrator! Control Panel active.', 'success');
      this.logAudit('Administrator login authenticated', 'SUCCESS');
      this.navigate('admin');
      return;
    }
  }

  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  openChangePasswordModal() {
    if (this.currentUserRole !== 'student' || !this.currentStudentRoll) {
      this.showToast('Please log in as a student to change your password.', 'info');
      return;
    }
    this.closeUserMenu();
    const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll);
    if (!student) return;
    document.getElementById('changePasswordStudent').value = `${student.name} (${student.rollNo})`;
    document.getElementById('currentAccountPassword').value = '';
    document.getElementById('newAccountPassword').value = '';
    document.getElementById('confirmAccountPassword').value = '';
    this.openModal('changePasswordModal');
  }

  changeStudentPassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentAccountPassword')?.value.trim();
    const newPassword = document.getElementById('newAccountPassword')?.value.trim();
    const confirmPassword = document.getElementById('confirmAccountPassword')?.value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.showToast('Please complete all password fields.', 'danger');
      return;
    }
    if (newPassword.length < 6) {
      this.showToast('The new password must contain at least 6 characters.', 'danger');
      return;
    }
    if (newPassword !== confirmPassword) {
      this.showToast('The new password and confirmation do not match.', 'danger');
      return;
    }

    const students = this.getStudents();
    const student = students.find(s => s.rollNo === this.currentStudentRoll);
    if (!student) return;
    if (student.password !== currentPassword) {
      this.showToast('The current password is incorrect.', 'danger');
      return;
    }

    student.password = newPassword;
    this.saveStudents(students);
    this.closeModal('changePasswordModal');
    this.showToast('Password changed successfully.', 'success');
    this.logAudit(`Student password changed: ${student.name} [${student.rollNo}]`, 'SUCCESS');
  }

  toggleLoginRegisterView(showRegister) {
    const loginForm = document.getElementById('standaloneLoginForm');
    const regForm = document.getElementById('standaloneRegisterForm');
    const errBox = document.getElementById('loginErrorAlert');
    if (errBox) errBox.style.display = 'none';

    if (showRegister) {
      if (loginForm) loginForm.style.display = 'none';
      if (regForm) regForm.style.display = 'block';
    } else {
      if (loginForm) loginForm.style.display = 'block';
      if (regForm) regForm.style.display = 'none';
    }
  }

  processRegister(event) {
    event.preventDefault();
    const fName = document.getElementById('regMainFirstName')?.value.trim() || 'New';
    const lName = document.getElementById('regMainLastName')?.value.trim() || 'Student';
    const roll = document.getElementById('regMainRoll')?.value.trim().toUpperCase() || '25VV1A1299';
    const course = document.getElementById('regMainCourse')?.value.trim() || 'B.Tech IT';
    const email = document.getElementById('regMainEmail')?.value.trim() || 'student@college.edu';
    const phone = document.getElementById('regMainPhone')?.value.trim() || '+91 98765 43210';
    const address = document.getElementById('regMainAddress')?.value.trim() || 'Hostel Campus';
    const registrationPassword = document.getElementById('regMainPassword')?.value.trim();

    const students = this.getStudents();
    if (students.find(s => s.rollNo === roll)) {
      this.showToast('Roll number already registered!', 'danger');
      return;
    }

    const newStudent = {
      userID: students.length + 1,
      name: `${fName} ${lName}`,
      email: email,
      password: registrationPassword || `${fName} ${lName}`.toUpperCase() + '@' + roll.slice(-4),
      phone: phone,
      address: address,
      rollNo: roll,
      course: course,
      department: 'Information Technology',
      memberSince: 'Aug 2026',
      status: 'Approved',
      outstandingFine: 0
    };

    students.push(newStudent);
    this.saveStudents(students);
    this.currentStudentRoll = roll;

    this.logAudit(`New student registered: ${newStudent.name} (${roll}).`, 'SUCCESS');
    this.showToast(`Registration successful! Welcome, ${fName}.`, 'success');
    this.toggleLoginRegisterView(false);
    this.switchRole('student');
    this.navigate('dashboard');
  }

  showLoginModal() {
    this.closeUserMenu();
    this.openModal('loginModal');
  }

  showRegisterModal() {
    this.closeModal('loginModal');
    this.openModal('registerModal');
  }

  handleLogin(event) {
    event.preventDefault();
    const role = document.getElementById('loginRoleSelect')?.value || 'student';
    const idInput = document.getElementById('loginEmailInput')?.value.trim();
    const password = document.getElementById('loginPasswordInput')?.value.trim();

    if (!idInput || !password) {
      this.showToast('Please enter both ID/Email and Password.', 'danger');
      return;
    }

    if (role === 'student') {
      const students = this.getStudents();
      const student = students.find(s => 
        (s.rollNo && s.rollNo.trim().toUpperCase() === idInput.toUpperCase()) ||
        (s.email && s.email.trim().toLowerCase() === idInput.toLowerCase()) ||
        (idInput.toLowerCase() === 'jaswanth.student@college.edu' && s.rollNo === '25VV1A1234')
      );

      if (!student) {
        this.showToast(`Student with Roll No / Email "${idInput}" not found.`, 'danger');
        return;
      }

      const expectedPassword = student.password || `${student.name}@${student.rollNo.slice(-4)}`;
      if (password !== expectedPassword) {
        this.showToast(`Incorrect password for ${student.name}.`, 'danger');
        return;
      }

      this.currentStudentRoll = student.rollNo;
      this.closeModal('loginModal');
      this.switchRole('student');
      this.showToast(`Welcome back, ${student.name} (${student.rollNo})!`, 'success');
      this.logAudit(`Student modal login authenticated: ${student.name} [${student.rollNo}]`, 'SUCCESS');
      this.navigate('dashboard');
      return;
    }

    if (role === 'kiosk') {
      const validIds = ['kiosk', 'kiosk1', 'kiosk.operator@college.edu', 'operator'];
      if (!validIds.includes(idInput.toLowerCase()) || password !== 'kiosk123') {
        this.showToast('Invalid Kiosk credentials (Use ID: kiosk, Pass: kiosk123)', 'danger');
        return;
      }
      this.closeModal('loginModal');
      this.switchRole('kiosk');
      this.showToast('Logged in as Kiosk Station Operator', 'success');
      this.navigate('kiosk');
      return;
    }

    if (role === 'admin') {
      const validIds = ['admin', 'librarian', 'admin.librarian@college.edu'];
      if (!validIds.includes(idInput.toLowerCase()) || password !== 'admin123') {
        this.showToast('Invalid Admin credentials (Use ID: admin, Pass: admin123)', 'danger');
        return;
      }
      this.closeModal('loginModal');
      this.switchRole('admin');
      this.showToast('Logged in as Administrator', 'success');
      this.navigate('admin');
      return;
    }
  }

  handleRegister(event) {
    event.preventDefault();
    const fName = document.getElementById('regFirstName').value.trim();
    const lName = document.getElementById('regLastName').value.trim();
    const roll = document.getElementById('regRollNo').value.trim().toUpperCase();
    const course = document.getElementById('regCourse').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const address = document.getElementById('regAddress').value.trim();
    const registrationPassword = document.getElementById('regPassword').value.trim();

    const students = this.getStudents();
    if (students.find(s => s.rollNo === roll)) {
      this.showToast("Student with this roll number is already registered!", "danger");
      return;
    }

    const newStudent = {
      userID: students.length + 1,
      name: `${fName} ${lName}`,
      email: email,
      password: registrationPassword || `${fName} ${lName}`.toUpperCase() + '@' + roll.slice(-4),
      phone: phone,
      address: address,
      rollNo: roll,
      course: course,
      department: "Information Technology",
      memberSince: "Aug 2026",
      status: "Approved",
      outstandingFine: 0
    };

    students.push(newStudent);
    this.saveStudents(students);
    this.currentStudentRoll = roll;

    this.logAudit(`New student registered: ${newStudent.name} (${roll}).`, "SUCCESS");
    this.showToast("Registration successful! Account activated.", "success");
    this.closeModal('registerModal');
    this.switchRole('student');
  }

  openBookDetailsModal(bookId) {
    const book = this.getBooks().find(b => b.bookID === bookId);
    if (!book) return;

    const body = document.getElementById('bookModalBody');
    const isAvail = book.available > 0;

    body.innerHTML = `
      <div class="book-modal-layout">
        <div class="book-modal-cover">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <div class="book-modal-info">
          <div style="margin-bottom:12px;">
            <span class="badge badge-info">${book.category}</span>
            <span class="badge ${isAvail ? 'badge-success' : 'badge-danger'}" style="margin-left:8px;">
              ${isAvail ? `In Stock (${book.available}/${book.quantity})` : 'Out of Stock'}
            </span>
          </div>
          <h2 style="font-size:1.6rem; font-weight:800; color:#1e1b4b; line-height:1.2; margin-bottom:6px;">${book.title}</h2>
          <p style="color:#64748b; font-size:1rem; margin-bottom:18px;">by <strong>${book.author}</strong></p>

          <div class="book-modal-specs">
            <div><strong>Book ID:</strong> #${book.bookID}</div>
            <div><strong>Publisher & Edition:</strong> ${book.publisher} • ${book.edition}</div>
            <div><strong>Department / Faculty:</strong> ${book.department}</div>
            <div><strong>Standard Lending Duration:</strong> 15 Days (Semester Scheme available)</div>
          </div>

          <div class="book-modal-desc">
            ${book.description || 'Core textbook recommended by university syllabus for academic study.'}
          </div>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary" onclick="app.reserveOrBorrowDirect(${book.bookID})" ${!isAvail ? 'disabled' : ''}>
              ${isAvail ? 'Reserve Book Online (REQ-3)' : 'Currently Unavailable'}
            </button>
            <button class="btn btn-secondary" onclick="app.closeModal('bookDetailsModal')">Back to Catalog</button>
          </div>
        </div>
      </div>
    `;

    this.openModal('bookDetailsModal');
  }

  reserveOrBorrowDirect(bookId) {
    const book = this.getBooks().find(b => b.bookID === bookId);
    if (!book || book.available <= 0) {
      this.showToast("This book is currently out of stock.", "danger");
      return;
    }

    const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll) || this.getStudents()[0];
    const currentActive = this.getTransactions().filter(t => t.studentRollNo === student.rollNo && t.status === 'Issued');

    if (currentActive.length >= this.config.maxBooksPerStudent) {
      this.showToast(`Borrowing quota reached (${this.config.maxBooksPerStudent} books). Return a book first.`, "danger");
      return;
    }

    // Decrement stock
    const books = this.getBooks();
    const idx = books.findIndex(b => b.bookID === bookId);
    books[idx].available--;
    this.saveBooks(books);

    // Create transaction
    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + this.config.standardDurationDays);
    const formatDate = d => d.toISOString().split('T')[0];

    const newTxId = Math.floor(100 + Math.random() * 900);
    const newTx = {
      transactionID: newTxId,
      studentRollNo: student.rollNo,
      studentName: student.name,
      bookID: book.bookID,
      bookTitle: book.title,
      issueDate: formatDate(today),
      dueDate: formatDate(due),
      returnDate: null,
      status: "Issued",
      fine: 0,
      paidFine: false
    };

    const txs = this.getTransactions();
    txs.unshift(newTx);
    this.saveTransactions(txs);

    // Notification
    const notifs = this.getNotifications();
    notifs.unshift({
      id: Date.now(),
      type: "info",
      title: "Book Reservation Confirmed",
      message: `"${book.title}" is reserved for you. Due date: ${newTx.dueDate}. Collect receipt from kiosk.`,
      date: formatDate(today),
      read: false
    });
    this.saveNotifications(notifs);

    this.closeModal('bookDetailsModal');
    this.logAudit(`Student ${student.name} reserved "${book.title}" (Tx #${newTxId}).`, "SUCCESS");
    this.showToast(`Reserved "${book.title}"! Due on ${newTx.dueDate}`, "success");
    this.renderAll();
    this.navigate('home');
  }

  openDonateModal() {
    this.openModal('donateModal');
  }

  handleDonateBook(event) {
    event.preventDefault();
    const title = document.getElementById('donateTitle').value.trim();
    const author = document.getElementById('donateAuthor').value.trim();
    const category = document.getElementById('donateCategory').value;
    const edition = document.getElementById('donateEdition').value.trim() || "Donated Edition";

    const books = this.getBooks();
    const newId = 100 + books.length + 1;
    const newBook = new Book(newId, title, author, "Donated to Book Bank", edition, 1, category, "Student Donation", "Contributed by student donor to assist peers.");
    books.push(newBook);
    this.saveBooks(books);

    this.logAudit(`Book donated: "${title}" by ${author}. Added to Book Bank inventory #${newId}.`, "SUCCESS");
    this.showToast(`Thank you! "${title}" added to the Book Bank.`, "success");
    this.closeModal('donateModal');
    this.renderAll();
  }

  openExtensionModal(txId) {
    const tx = this.getTransactions().find(t => t.transactionID === txId);
    if (!tx) return;

    const body = document.getElementById('extensionModalBody');
    body.innerHTML = `
      <div style="margin-bottom:16px;">
        <p><strong>Book:</strong> ${tx.bookTitle}</p>
        <p><strong>Current Due Date:</strong> ${tx.dueDate}</p>
      </div>
      <div class="form-group">
        <label>Select Extension Period:</label>
        <select id="extDaysSelect" class="form-select">
          <option value="7">Extend by 7 Days (Standard Academic Extension)</option>
          <option value="14">Extend by 14 Days (Exam Preparation)</option>
          <option value="30">Extend by 30 Days (Semester Project)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Reason for Extension:</label>
        <textarea id="extReason" class="form-textarea" rows="2" placeholder="e.g. Preparing for end-semester exams..."></textarea>
      </div>
      <button class="btn btn-primary btn-block" onclick="app.processExtension(${txId})">Submit Extension Request</button>
    `;
    this.openModal('extensionModal');
  }

  processExtension(txId) {
    const days = parseInt(document.getElementById('extDaysSelect')?.value || 7);
    const txs = this.getTransactions();
    const idx = txs.findIndex(t => t.transactionID === txId);
    if (idx === -1) return;

    const curDue = new Date(txs[idx].dueDate);
    curDue.setDate(curDue.getDate() + days);
    txs[idx].dueDate = curDue.toISOString().split('T')[0];
    this.saveTransactions(txs);

    this.logAudit(`Extension of ${days} days granted for Tx #${txId} ("${txs[idx].bookTitle}").`, "INFO");
    this.showToast(`Extension approved! New due date: ${txs[idx].dueDate}`, "success");
    this.closeModal('extensionModal');
    this.renderAll();
  }

  openPayFinesModal() {
    const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll) || this.getStudents()[0];
    const txs = this.getTransactions().filter(t => t.studentRollNo === student.rollNo && t.status === 'Issued');

    let totalFine = 0;
    let totalDays = 0;
    txs.forEach(t => {
      const txObj = new Transaction(t.transactionID, t.studentRollNo, t.studentName, t.bookID, t.bookTitle, t.issueDate, t.dueDate, t.returnDate, t.status, t.fine, t.paidFine);
      const days = txObj.getOverdueDays();
      totalDays += days;
      totalFine += days * this.config.finePerDay;
    });

    const sName = document.getElementById('payFineStudentName');
    const tDays = document.getElementById('payFineTotalDays');
    const fAmt = document.getElementById('payFineAmount');

    if (sName) sName.textContent = `${student.name} (${student.rollNo})`;
    if (tDays) tDays.textContent = `${totalDays} Overdue Days Across Active Books`;
    if (fAmt) fAmt.textContent = `₹${totalFine.toLocaleString()}`;

    this.openModal('payFinesModal');
  }

  processFinePayment() {
    const student = this.getStudents().find(s => s.rollNo === this.currentStudentRoll) || this.getStudents()[0];
    const txs = this.getTransactions();

    txs.forEach(t => {
      if (t.studentRollNo === student.rollNo && t.status === 'Issued') {
        t.paidFine = true;
        // Reset due date to today to clear overdue status
        const todayStr = new Date().toISOString().split('T')[0];
        const newDue = new Date();
        newDue.setDate(newDue.getDate() + 15);
        t.dueDate = newDue.toISOString().split('T')[0];
      }
    });
    this.saveTransactions(txs);

    this.logAudit(`Fine payment of ₹655 settled for student ${student.rollNo}.`, "SUCCESS");
    this.showToast("Payment Successful! Fine balance cleared.", "success");
    this.closeModal('payFinesModal');
    this.renderAll();
  }

  openReportDamageModal() {
    const select = document.getElementById('damageBookSelect');
    if (select) {
      const books = this.getBooks();
      select.innerHTML = books.map(b => `<option value="${b.bookID}">[#${b.bookID}] ${b.title}</option>`).join('');
    }
    this.openModal('reportDamageModal');
  }

  handleReportDamage(event) {
    event.preventDefault();
    const bookId = document.getElementById('damageBookSelect').value;
    const type = document.getElementById('damageTypeSelect').value;
    const notes = document.getElementById('damageNotes').value.trim();

    this.logAudit(`Student submitted condition report for Book #${bookId}: ${type} (${notes})`, "WARN");
    this.showToast("Condition report logged. Library admin has been notified.", "info");
    this.closeModal('reportDamageModal');
  }

  openReceiptModal(txId) {
    const tx = this.getTransactions().find(t => t.transactionID === txId);
    if (!tx) return;

    const area = document.getElementById('receiptPrintArea');
    const isReturned = tx.status === 'Returned';

    area.innerHTML = `
      <div class="receipt-header">
        <h3>BOOK BANK SYSTEM - TRANSACTION SLIP</h3>
        <p>Institutional Central Library • Roll: 25VV1A1234</p>
      </div>
      
      <div class="receipt-row">
        <span>Slip Type:</span>
        <strong>${isReturned ? 'OFFICIAL RETURN RECEIPT' : 'BOOK BORROW & ISSUE RECEIPT'}</strong>
      </div>
      <div class="receipt-row">
        <span>Transaction ID:</span>
        <strong>#BB-${tx.transactionID}</strong>
      </div>
      <div class="receipt-row">
        <span>Date & Time:</span>
        <span>${new Date().toLocaleString()}</span>
      </div>
      <hr style="border:none; border-top:1px dashed #cbd5e1; margin:8px 0;">
      
      <div class="receipt-row">
        <span>Borrower Name:</span>
        <strong>${tx.studentName}</strong>
      </div>
      <div class="receipt-row">
        <span>Roll Number:</span>
        <span>${tx.studentRollNo}</span>
      </div>
      <div class="receipt-row">
        <span>Book Title:</span>
        <strong>${tx.bookTitle}</strong>
      </div>
      <div class="receipt-row">
        <span>Book Catalog ID:</span>
        <span>#${tx.bookID}</span>
      </div>
      <div class="receipt-row">
        <span>Issue Date:</span>
        <span>${tx.issueDate}</span>
      </div>
      <div class="receipt-row">
        <span>Scheduled Return Due Date:</span>
        <strong style="color:${isReturned ? '#10b981' : '#4f46e5'};">${tx.dueDate}</strong>
      </div>
      
      ${isReturned ? `
        <div class="receipt-row">
          <span>Actual Return Date:</span>
          <span>${tx.returnDate}</span>
        </div>
        <div class="receipt-row">
          <span>Fine Paid:</span>
          <strong>₹${tx.fine}</strong>
        </div>
      ` : ''}

      <div class="receipt-barcode">
        <div class="barcode-lines"></div>
        <small>*BB-${tx.transactionID}-${tx.studentRollNo}*</small>
        <p style="font-size:0.75rem; color:#64748b; margin-top:4px;">Please retain this receipt for physical return at Kiosk Terminal.</p>
      </div>
    `;

    this.openModal('receiptModal');
  }

  printBorrowingReceipt(type) {
    this.openReceiptModal(701);
  }

  downloadBorrowingHistory() {
    this.exportReportCSV('history');
  }

  // Backup & Restore (Admin)
  downloadBackup() {
    const data = {
      books: this.getBooks(),
      students: this.getStudents(),
      transactions: this.getTransactions(),
      notifications: this.getNotifications(),
      config: this.config,
      exportDate: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `BookBank_Database_Backup_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    this.showToast("Database backup downloaded as JSON.", "success");
  }

  restoreBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.books) this.saveBooks(data.books);
        if (data.students) this.saveStudents(data.students);
        if (data.transactions) this.saveTransactions(data.transactions);
        if (data.notifications) this.saveNotifications(data.notifications);
        if (data.config) this.config = data.config;

        this.logAudit("Database restored from JSON backup file.", "WARN");
        this.showToast("Database successfully restored from backup!", "success");
        this.renderAll();
      } catch (err) {
        this.showToast("Invalid JSON file format.", "danger");
      }
    };
    reader.readAsText(file);
  }

  // ====================================================================
  // 11. UML & COCOMO MODEL CALCULATOR (Experiment 4, Page 50–62)
  // ====================================================================
  switchUmlTab(tab) {
    document.querySelectorAll('[data-uml-tab]').forEach(btn => {
      if (btn.dataset.umlTab === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.querySelectorAll('.uml-tab-pane').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`umlTab-${tab}`);
    if (target) target.classList.add('active');
  }

  calculateCocomo() {
    const kloc = parseFloat(document.getElementById('cocomoKloc')?.value || 32);
    const mode = document.getElementById('cocomoMode')?.value || 'organic';
    const salary = parseFloat(document.getElementById('cocomoSalary')?.value || 15000);

    let a, b, c, d;
    if (mode === 'organic') {
      a = 2.4; b = 1.05; c = 2.5; d = 0.38;
    } else if (mode === 'semidetached') {
      a = 3.0; b = 1.12; c = 2.5; d = 0.35;
    } else {
      a = 3.6; b = 1.20; c = 2.5; d = 0.32;
    }

    // Formulas:
    // Effort = a * (KLOC)^b
    // Time = c * (Effort)^d
    // Cost = Effort * salary
    const effort = a * Math.pow(kloc, b);
    const time = c * Math.pow(effort, d);
    const cost = effort * salary;
    const staff = effort / time;

    const resEffort = document.getElementById('resEffort');
    const resTime = document.getElementById('resTime');
    const resCost = document.getElementById('resCost');
    const resStaff = document.getElementById('resStaff');

    if (resEffort) resEffort.textContent = `${effort.toFixed(2)} Person-Months`;
    if (resTime) resTime.textContent = `${time.toFixed(2)} Months`;
    if (resCost) resCost.textContent = `₹${Math.round(cost).toLocaleString()}`;
    if (resStaff) resStaff.textContent = `${staff.toFixed(1)} Developers`;
  }

  // Toast System
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'danger' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Master Render Cycle
  renderAll() {
    this.updateCategoryCounts();
    this.filterCatalog();
    this.renderStudentDashboard();
    this.renderKioskView();
    this.renderAdminView();
    this.updateNotifBadges();
  }

  initEventListeners() {
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-pill-container')) {
        this.closeUserMenu();
      }
      if (!e.target.closest('.icon-btn') && !e.target.closest('.notif-dropdown')) {
        const notif = document.getElementById('notifDropdown');
        if (notif) notif.classList.remove('show');
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
      }
    });
  }
}

// Global Application Instance
const app = new BookBankApp();

