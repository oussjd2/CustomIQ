function handleOpenAIError(error, res) {
    console.error("OpenAI API error:", error);

    // Check if the error is related to billing limits
    if (error.code === 'billing_hard_limit_reached') {
        res.status(402).json({ error: "Billing limit reached. Please check your OpenAI account or try again later." });
    } else {
        // Generic error handling for other types of errors
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
}

//module.exports = { handleOpenAIError };

function handleLoginError(error, res) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login. Please try again." });
}

function handleCreateUserError(error, res) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "An error occurred creating the user. Please try again." });
}

function handleGetAllUsersError(error, res) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Failed to retrieve users. Please try again." });
}

function handleGetUserByIdError(error, res) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve the user. Please try again." });
}

function handleUpdateUserByIdError(error, res) {
    console.error("Update user by ID error:", error);
    res.status(500).json({ error: "Failed to update the user. Please try again." });
}

function handleDeleteUserByIdError(error, res) {
    console.error("Delete user by ID error:", error);
    res.status(500).json({ error: "Failed to delete the user. Please try again." });
}

function handleRequestPasswordResetError(error, res) {
    console.error("Request password reset error:", error);
    res.status(500).json({ error: "Failed to request password reset. Please try again." });
}

function handleResetPasswordError(error, res) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to reset password. Please try again." });
}

export {
    handleLoginError,
    handleCreateUserError,
    handleGetAllUsersError,
    handleGetUserByIdError,
    handleUpdateUserByIdError,
    handleDeleteUserByIdError,
    handleRequestPasswordResetError,
    handleResetPasswordError
};
