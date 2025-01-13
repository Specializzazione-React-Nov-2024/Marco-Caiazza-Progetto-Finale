export function getAvatarUrl(file) {

    if (!file) {
        return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    }
return `https://slucjpzdmypwxhtlzunh.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMzU1Mjg2NTkxMjY2MDczNC5qcGciLCJpYXQiOjE3MzY1MDE1MjcsImV4cCI6MTc2ODAzNzUyN30.tQxo4fgfmg5AAkpdtjRonCH574_Nnys0hfYkusbXC1Q&t=2025-01-10T09%3A32%3A07.294Z`
}