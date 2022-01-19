const _keyNames = {
    access_token : 'access_token',
    refresh_token : 'refresh_token',
    token_type : 'token_type',
    user_data : 'userData'
}


// get tokens
// ============================================
function getAccessToken() {
    return localStorage.getItem(_keyNames.access_token)
}

function getRefreshToken() {
    return localStorage.getItem(_keyNames.refresh_token)
}

function getUserData() {
    const item = localStorage.getItem(_keyNames.user_data)
    if (item) {
        return JSON.parse(item)
    }
    return {}
}

// set tokens
// ====================================================
function setAccessToken(value) {
    localStorage.setItem(_keyNames.access_token, value)
}

function setRefreshToken(value) {
    localStorage.setItem(_keyNames.refresh_token, value)
}

function setUserData(value) {
    const item = JSON.stringify(value)
    localStorage.setItem(_keyNames.user_data, item)
}

// Delete tokens
// ===============================================
function clearTokens() {
    localStorage.removeItem(_keyNames.access_token)
    localStorage.removeItem(_keyNames.refresh_token)
    localStorage.removeItem(_keyNames.token_type)
    localStorage.removeItem(_keyNames.user_data)
}


export default {
    getAccessToken, 
    setAccessToken, 
    getRefreshToken, 
    setRefreshToken, 
    getUserData,
    setUserData,
    clearTokens,
    
    }