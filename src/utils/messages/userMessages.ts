export const usrMessage = {
  err: {
    requiredFieldsReg: 'All fields are required (Nome, E-mail, Senha)',
    requiredFieldsLogin: 'All fields are required (E-mail, Senha)',
    requiredFieldsEdtUsr: 'All fields are required (Nome, E-mail, Senha)',
    requiredFieldsRstPass:
      'All fields are required (Email, Senha Antiga, Nova Senha)',
    invalidEmail: 'Please, enter a valid E-mail',
    emailInUse: 'This E-mail is already in use',
    weakPeassword: `Weak Password!
                    Password must contain the following requirements:
                    Contains at least one capital letter.
                    Contains at least one number.
                    Contains at least one special character.
                    It is at least 6 characters long.`,
    invalidCredentials:
      'Invalid email or password. Please check your credentials and try again.',
    usrNotFound: 'User not found. Please check your credentials and try again.',
    oldNewPassMatch:
      'The new password cannot be the same as your current password. Please choose a different password.',
    invalidOldPass:
      'The current password you entered is incorrect. Please try again.',
    usrIDNotANumber:
      'The provided user ID is not a valid number. Please ensure that you are using a numeric value.',
    usrInvalidConfirmationToken: `The provided token is invalid or does not correspond to any registered user.
        A token is required to confirm your email. Please use the link sent to your email, which looks like this:
        "http:ourdomain/token".`,
    notVerified:
      'You are not authorized to log in yet. Please confirm your email to activate your account.',
    alreadyVerified:
      'It seems that your email has already been confirmed. If you have any questions or need further assistance, please feel free to reach out to our support team.',
    missingConfirmEmailToken: `A token is required to confirm your email. Please use the link sent to your email, which looks like this: "http:ourdomain/token".`,
    nameNotAString:
      'The value for field Name (nome) is not a valid value. Please enter valid text.',
    emailNotAString:
      'The value for field Email (email) is not a valid value. Please enter valid text.',
    oldPassNotAString:
      'The value for field old password (senha_antiga) is not a valid value. Please enter valid text.',
    passNotAString:
      'The value for field Password (senha) is not a valid value. Please enter valid text.',
    nameLengthNotValid:
      'Please enter a valid name (nome) with at least three (3) characters. The name cannot contain special characters or numbers.',
  },
  success: {
    confirmEmailSent: `To activate your account, please check your email and click on the confirmation link we just sent.
            If you don't find the email in your inbox, check your spam or junk folder.`,
    resetPassEmailSub: 'Important: Your Password Has Been Changed',
    resetPassEmail: `Your password has been successfully changed. If you did not make this change, please contact our support team immediately.`,
    resetPassSuccess:
      'Your password has been successfully reset. You can now log in with your new credentials.',
    usrUpdated:
      'Your account details have been successfully updated. Thank you for keeping your information current.',
    usrUpdatedKeepData: `Your account details have been successfully updated. However, it appears that your credentials, such as email or password, remain unchanged. If this was intentional, no further action is required. Should you wish to update your credentials in the future, you can do so at any time through your account settings.`,
    usrEmailConfirmed:
      'Email confirmation completed successfully! You can now access your account.',
  },
};
