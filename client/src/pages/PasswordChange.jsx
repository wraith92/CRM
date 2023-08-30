import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordChangeCountdown = ({ userId }) => {
  const [daysSinceLastChange, setDaysSinceLastChange] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false); // Nouvel état pour afficher/masquer le mot de passe

  useEffect(() => {
    const fetchDaysSinceLastChange = async () => {
      try {
        const user = AuthService.getCurrentUser();
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/api/auth/days-since-password-change/${user.id}`
        );
        const data = response.data;
        setDaysSinceLastChange(data.days);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des jours depuis le dernier changement de mot de passe:",
          error
        );
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
          <p>Votre mot de passe a expiré.</p>
        </div>
      ) : (
        <div>
          <p>Il vous reste {daysRemaining} jours avant l'expiration de votre mot de passe.</p>
          <br />
          <div>
            {showPasswordChangeForm ? (
              <div>
                <label>Mot de passe actuel</label>
                <TextField
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <label>Nouveau mot de passe</label>
                <TextField
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <br />
                <label>Confirmez le nouveau mot de passe</label>
                <TextField
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <br />
                <br />
                <Button onClick={handleChangePassword}>Changer le mot de passe</Button>
                {message && <div>{message}</div>}
              </div>
            ) : (
              <div>
                <br />
                <Button onClick={() => setShowPasswordChangeForm(true)}>Changer le mot de passe</Button>
              </div>
              
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeCountdown;
