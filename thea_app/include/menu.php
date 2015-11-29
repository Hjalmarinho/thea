<?php
$page = basename($_SERVER['PHP_SELF']);

?>

<div class="header item">
    Thea
</div>
<a class="item <?php if ($page == 'dashboard.php') echo 'active'; ?>" href="dashboard.php">Framside</a>
<a class="item <?php if ($page == 'participants.php') echo 'active'; ?>" href="participants.php">Påmeldinger</a>
<a class="item <?php if ($page == 'teams.php') echo 'active'; ?>" href="teams.php">Lag</a>
<a class="item <?php if ($page == 'user.php') echo 'active'; ?>" href="user.php">Din bruker</a>
<a class="item <?php if ($page == 'about.php') echo 'active'; ?>">Om Thea 2.0</a>