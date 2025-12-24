# 📦 BlockStore  
### Secure Decentralized File Storage using IPFS, Encryption, MongoDB, and Blockchain

---

## 📖 Overview

**BlockStore** is a decentralized file storage system that enables users to securely upload, store, and retrieve files using **password-based encryption**, **IPFS for decentralized storage**, **MongoDB for metadata indexing**, and **blockchain (Ganache / Ethereum)** for immutable proof of file existence and ownership.

The system ensures that:
- Files are **never stored in plaintext**
- Passwords are **never stored**
- Backend and storage nodes **cannot read user data**
- File existence can be **cryptographically proven on blockchain**

---

## 🏗️ System Architecture


---

## 🔐 Security Model

- Files are encrypted using **AES-256**
- Encryption keys are derived from a **user-provided password**
- Passwords are:
  - ❌ Never stored
  - ❌ Never logged
  - ❌ Never sent to IPFS or blockchain
- Only users with the **correct password** can retrieve and decrypt the file

---

## 🚀 Key Features

- 🔒 End-to-End Encrypted File Storage  
- 🌐 Decentralized Storage using IPFS  
- 🗂️ Metadata Indexing using MongoDB  
- ⛓️ Blockchain-based Proof of File Existence  
- 🎨 Modern UI using React + Tailwind CSS  
- 🧪 Fully Local Development Setup  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- Crypto (AES-256 encryption)
- MongoDB

### Decentralized Storage
- IPFS (Kubo)
- Docker

### Blockchain
- Solidity
- Hardhat
- Ganache
- ethers.js

---


---

## 🔄 Application Flow

### 📤 File Upload

1. User selects a file and sets a password  
2. Backend splits the file into chunks  
3. Each chunk is encrypted and uploaded to IPFS  
4. A **manifest file** (metadata + chunk CIDs) is created  
5. Manifest CID is:
   - Stored in MongoDB (for UI listing)
   - Registered on blockchain (immutable proof)

---

### 📥 File Retrieval

1. User selects a file from **My Files**  
2. User enters the password  
3. Backend fetches encrypted chunks from IPFS  
4. File is decrypted and reconstructed  
5. File is downloaded if password is correct  

---

## ⛓️ Blockchain Usage

Blockchain is used **only for verification**, not storage.

Stored on blockchain:
- Manifest CID
- Uploader address
- Timestamp

Benefits:
- Immutable proof of file existence
- Ownership verification
- No trust required in backend or database

---

## 🧪 Local Development Setup

### Prerequisites
- Node.js **v22 (LTS)**
- Docker
- MongoDB
- Ganache

---

### Run IPFS (Docker)

```bash
cd ipfs
docker compose up -d


## 📂 Project Structure

