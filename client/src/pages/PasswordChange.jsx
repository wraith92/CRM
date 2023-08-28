import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";

const PasswordChangeCountdown = ({ userId }) => {
  const [daysSinceLastChange, setDaysSinceLastChange] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);

  useEffect(() => {
    // Fetch the number of days since the last password change from the backend API
    const fetchDaysSinceLastChange = async () => {
      try {
        const user = AuthService.getCurrentUser();
        const response = await axios.get(
          `https://sofcem.mtech.dev:443/api/auth/days-since-password-change/${user.id}`
        );
        const data = response.data;
        setDaysSinceLastChange(data.days);
      } catch (error) {
        console.error("Error fetching days since password change:", error);
      }
    };

    fetchDaysSinceLastChange();
  }, []);

  const daysRemaining = 30 - daysSinceLastChange;

  const validatePassword = (password) => {
    // Validation criteria: 10 characters minimum, at least one uppercase letter, and at least one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{10,})$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = () => {
    if (!validatePassword(newPassword)) {
      setMessage(
        "New password must be at least 10 characters long and contain at least one uppercase letter and one special character."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    // Call the backend API to change the password
    AuthService.changePassword(userId, oldPassword, newPassword)
      .then((response) => {
        setMessage(response.message);
        setShowPasswordChangeForm(false);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div>
      {daysRemaining <= 0 ? (
        <div>
          <p>Your password is expired.</p>
        </div>
      ) : (
        <div>
          <p>You have {daysRemaining} days until your password expires.</p>
          <div>
            {showPasswordChangeForm ? (
              <div>
                <label>Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Change Password</button>
                {message && <div>{message}</div>}
              </div>
            ) : (
              <button onClick={() => setShowPasswordChangeForm(true)}>Change Password</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeCountdown;
