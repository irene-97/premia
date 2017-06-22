<div class="section-header">
    <div class="container">
        <a class="logo" href="/">
            <img src="images/logo.png" alt="">
        </a>
        <div class="menu-wrapper">
            <button class="toggle"></button>
            <ul class="menu">
                <li class="item">
                    <a href="#">Премия</a>
                    <ul class="submenu">
                        <li class="item">
                            <a href="about.php">Положение о Премии</a>
                        </li>
                        <li class="item">
                            <a href="council.php">Общественный совет</a>
                        </li>
                        <li class="item">
                            <a href="#">Конкурс 2015</a>
                        </li>
                        <li class="item">
                            <a href="#">Конкурс 2014</a>
                        </li>
                        <li class="item">
                            <a href="#">Конкурс 2013</a>
                        </li>
                        <li class="item">
                            <a href="#">Конкурс 2012</a>
                        </li>
                        <li class="item">
                            <a href="#">Учредитель Премии</a>
                        </li>
                        <li class="item">
                            <a href="#">Символика Премии</a>
                        </li>
                    </ul>
                </li>
                <li class="item">
                    <a href="#">Участие</a>
                    <ul class="submenu">
                        <li class="item">
                            <a href="#">Анкета участника</a>
                        </li>
                        <li class="item">
                            <a href="#">Подать заявку</a>
                        </li>
                        <li class="item">
                            <a href="#">Номинации</a>
                        </li>
                        <li class="item">
                            <a href="#">Порядок проведения</a>
                        </li>
                    </ul>
                </li>
                <li class="item">
                    <a href="#">Партнеры</a>
                </li>
                <li class="item">
                    <a href="#">Пресс-центр</a>
                    <ul class="submenu">
                        <li class="item">
                            <a href="publications.php">Публикации</a>
                        </li>
                        <li class="item">
                            <a href="gallery.php">Фотогалерея</a>
                        </li>
                        <li class="item">
                            <a href="video.php">Видео</a>
                        </li>
                    </ul>
                </li>
                <li class="item">
                    <a href="#">Мероприятия</a>
                </li>
                <li class="item">
                    <a href="#">Контакты</a>
                </li>
            </ul>
            <button class="toggle"></button>
        </div>
        <a class="facebook" href="#"></a>
        <?php if (@$loggedin || @$_GET['loggedin']): ?>
            <div class="account">
                <div class="title">
                    Личный кабинет
                </div>
                <div class="text">
                    Вы вошли как:
                </div>
                <div class="username">
                    Иванов С.В.
                </div>
                <button class="button size_30">
                    Выход
                </button>
            </div>
        <?php else: ?>
            <div class="buttons">
                <a class="button register size_30 color_transparent-black" href="registration.php">
                    Регистрация
                </a>
                <button class="button login size_30 color_transparent-black js-fancybox" data-href="#login">
                    Личный кабинет
                </button>
            </div>
        <?php endif ?>
    </div>
</div>