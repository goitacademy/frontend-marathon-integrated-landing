<?php

$needed_files = array(
    '/home/goit/goit.ua/www/zohocrm/env.php',
    '/home/goit/goit.ua/www/zohocrm/zohohelpermethods.php',
);

foreach ($needed_files as $file) {
    require_once($file);
}
    
    