@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.main-container {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
}

.sidebar-container {
  flex: 0 0 250px;
  height: 100vh;
  overflow: auto;
}

.profile-container {
    padding: 1rem;
    background: linear-gradient(135deg, #81cfe0, #1eb1c8);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.profile-left, .profile-right {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.profile-left {
    align-items: center;
    justify-content: center;
}

.profile-photo {
    width: 100px;
    height: 100px;
    background: #ccc;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.profile-item {
    margin-bottom: 1rem;
}

.profile-item input {
    padding: 10px;
    font-size: 14px;
    font-weight: 300;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #0d8ba1;
}

button {
    background-color: #0c4da2;
    border: none;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    transition-duration: 0.4s;
    width: 100%;
}

button:hover {
    background-color: #57cb83;
    color: #fff;
}

@media screen and (max-width: 768px) {
    .profile-photo {
        width: 80px;
        height: 80px;
    }
}

@media screen and (max-width: 480px) {
    .profile-photo {
        width: 60px;
        height: 60px;
    }
}
