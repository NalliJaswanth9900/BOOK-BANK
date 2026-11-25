# Book Bank Management System
**CASE TOOLS & SOFTWARE ENGINEERING LABORATORY PROJECT**  
**Submitted to:** B. TIRIMULA RAO SIR  
**Prepared by:** 25VV1A1234 (NALLI JASWANTH)  

---

## 📌 Overview
This repository contains the **fully functional, interactive web application** implementing the exact specifications, user interfaces, functional requirements, and UML diagrams described in the **Book Bank Case Tools** laboratory document.

The website requires **zero server installation or dependencies**. You can open `index.html` in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox) to run the full application with real-time state persistence (`localStorage`).

---

## 🚀 Key Modules & Document Alignment

### 1. Experiment 1: Problem Statement & Stakeholder Perspectives
- **Student Actor Interface:** Easy book search, online reservation/request, borrowing history tracking, automated due-date reminders, feedback/damage reporting, and book donation module.
- **Kiosk Operator Interface:** Intermediary terminal at the library foyer. Fast ID scanning, instant eligibility verification, rapid book lending/issuance with due date slip, book return processing, on-site fine collection, and return receipt printing.
- **Administrator Interface:** Comprehensive book inventory management (CRUD), real-time stock monitoring, student account approvals, lending policy configuration, and report generation.

---

### 2. Experiment 2: Software Requirement Specification (SRS) & UI Design

| Document Screenshot | Feature Implemented | Location in Web Application |
|---|---|---|
| **Figure 1 (Page 10): Login Screen** | Modal authentication with User Class / Role selection (`student`, `kiosk`, `admin`), email & password fields, input validation. | Click top-right user menu &rarr; **Log In as Different User** |
| **Figure 2 (Page 11): Home Page** | Deep purple/indigo header, *"Welcome to Your Digital Library"*, search bar with live filtering, *"Browse Categories"* cards (Fiction, Science, Technology, History). | **Home** tab navigation |
| **Figure 3 (Page 12): Book Catalog** | Grid of book cards with covers, titles (*The Great Gatsby*, *Brief History of Time*, *Clean Code*, *Sapiens*), author, edition, category tag, and green `Available` status badges. | **Catalog** tab navigation |
| **Figure 4 (Page 13): Student Dashboard** | Student avatar (*NALLI JASWANTH*, *Member since Aug 2026*), 4 metric cards (Books Issued: 2, Currently Reading: 2, Books Returned: 0, Overdue: 2), **Currently Borrowed** list with overdue tags (*Clean Code* and *Ways of Seeing* with live overdue days and fine calculation), Notifications panel, fine settlement, and downloadable borrowing history. | **Dashboard** tab navigation |

---

### 3. Experiment 3: UML Diagrams & Architectural Realization
- **Use Case Diagram (Figures 5, 7, 8, 13–16):** Fully interactive workflows for Student (UC1–UC6), Kiosk (UC-K1–UC-K5), and Admin (UC-A1–UC-A4).
- **Class Diagram (Figures 9, 17, Pages 21, 38–41):**
  - `User` (Abstract base: userID, name, email, phone, address, login, logout)
  - `Student` (inherits `User`: rollNo, course, department, memberSince)
  - `Admin` (inherits `User`: empID, addBook, removeBook, issueBook, returnBook)
  - `Book` (bookID, title, author, publisher, edition, quantity, available, isAvailable)
  - `Transaction` (transactionID, issueDate, returnDate, dueDate, status, calculateFine)
  - `BookIssue` (association between Student and Book)
  - `Kiosk` (kioskID, location, authenticateUser, viewAvailableBooks, issueBook, returnBook, viewStudentHistory)
- **Sequence & Activity Diagrams (Figures 10, 12, 18, 20):**
  - Sequence 1: Book Request & Issue flow (Student &rarr; Kiosk &rarr; Inventory &rarr; Notifier).
  - Sequence 2: Book Return & Overdue Monitoring with late fine calculations.
  - Printable official slips with barcodes (Borrow Slip, Return Receipt).

---

### 4. Experiment 4: COCOMO Cost Estimation Model (Pages 50–62)
- Built-in **Interactive COCOMO Calculator**:
  - Supports **Organic**, **Semi-Detached**, and **Embedded** modes.
  - Inputs for Size ($KLOC$) and average salary per month.
  - Dynamically computes Effort ($Person\text{-}Months$), Development Time ($Months$), Total Project Cost, and Staffing based on Barry Boehm's formulas:
    $$\text{Effort} = A \times (\text{KLOC})^b$$
    $$\text{Time} = C \times (\text{Effort})^d$$
    $$\text{Cost} = \text{Effort} \times \text{Average Salary}$$

---

## 🛠️ How to Run & Test

1. **Launch the Website:**
   - Double-click or open `index.html` in your browser.
   - To open the responsive mobile version on a phone, connect the phone and computer to the same Wi-Fi network and run [`START_FOR_MOBILE.bat`](./START_FOR_MOBILE.bat) on the computer. Open the `http://...:8080` address printed in the console on the phone.
   
2. **Switching Roles:**
   - Click the user pill in the top-right corner to toggle between:
     - **Students:** Enter your roll number or supplied email address. The initial password format is your full name in capitals followed by `@` and the last four characters of your roll number, for example `NALLI JASWANTH@1234`. Logged-in students can change their password from the profile dropdown under **Change Password**.
     - **Kiosk Operator:** Scan or enter Student ID, check real-time availability, issue new books, process returns with condition inspection, and print official barcode slips.
     - **Administrator:** Add new books to catalog, inspect student accounts, change lending policy parameters, and generate real-time reports (SRS 7.3).

3. **Generating SRS Reports (Section 7.3):**
   - Navigate to **Admin Panel** &rarr; **Generate Reports (SRS 7.3)**.
   - Click on any report: *Inventory Report*, *Defaulters & Overdue Report*, *All-Time Lending Report*, or *Fine Collection Report*.
   - Click **Download CSV** to export real spreadsheet data.

4. **Testing COCOMO Model (Experiment 4):**
   - Navigate to **Lab Specs & UML** &rarr; **Experiment 4: COCOMO Model**.
   - Enter `32` KLOC and `15000` salary to verify the exact textbook problem solution ($91.33$ person-months, $13.85$ months, ₹13,64,965).

