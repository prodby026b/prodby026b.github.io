<?php
// Main Landing Page

echo 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): '.date('Y-m-d H:i:s')."\n";

echo 'Current User\'s Login: '.get_current_user();

function get_current_user() {
    return 'prodby026b';
}
?>