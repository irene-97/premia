<!doctype html>
<html lang="ru">
<head>
    <?php

    $title = 'Главная страница';
    include('includes/head.php');

    ?>
</head>
<body>
<div id="page">
    <div id="page_wrapper">
        <?php include('includes/section-header.php') ?>
        <?php include('includes/section-banner-slider.php') ?>
        <?php include('includes/section-info.php') ?>
        <?php include('includes/section-quote-slider.php') ?>
        <?php include('includes/section-choice-winner.php') ?>
        <?php include('includes/section-winners-of-year.php') ?>
        <?php include('includes/section-partners.php') ?>
    </div>
</div>
<?php include('includes/section-footer.php') ?>
<?php include('includes/modals.php') ?>
</body>
</html>