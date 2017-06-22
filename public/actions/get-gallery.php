<?php

$galleries = [
    '1' => [
        'title' => 'Церемония вручения премии «Лидер конкурентных закупок 2016»',
        'items' => [
            [
                'href' => 'images/gallery/image-1.jpg',
                'src' => 'images/gallery/image-1-preview.jpg',
            ],
            [
                'href' => 'images/gallery/image-3.jpg',
                'src' => 'images/gallery/image-3.jpg',
            ],
        ],
    ],
    '2' => [
        'title' => 'Церемония вручения премии «Лидер конкурентных закупок 2014»',
        'items' => [
            [
                'href' => 'images/gallery/image-4.jpg',
                'src' => 'images/gallery/image-4.jpg',
            ],
            [
                'href' => 'images/gallery/image-4.jpg',
                'src' => 'images/gallery/image-4.jpg',
            ],
        ],
    ],
    '3' => [
        'title' => 'Члены общественного совета на ТВ',
        'items' => [
            [
                'href' => 'images/gallery/image-6.jpg',
                'src' => 'images/gallery/image-6.jpg',
            ],
        ],
    ],
    '4' => [
        'title' => 'Церемония открытия Премии "Лидер конкурентных закупок"',
        'items' => [
            [
                'href' => 'images/gallery/image-2.jpg',
                'src' => 'images/gallery/image-2.jpg',
            ],
        ],
    ],
    '5' => [
        'title' => 'Заседание Общественного совета премии "Лидер конкурентных закупок" 21.05.2013',
        'items' => [
            [
                'href' => 'images/gallery/image-2.jpg',
                'src' => 'images/gallery/image-2.jpg',
            ],
        ],
    ],
    '6' => [
        'title' => 'Конкурс 2012',
        'items' => [
            [
                'href' => 'images/gallery/image-8.jpg',
                'src' => 'images/gallery/image-8.jpg',
            ],
        ],
    ],
];

$id = @$_REQUEST['id'];
$gallery = @$galleries[$id];

if ($gallery) {
    echo "<div class=\"main-gallery\" id=\"gallery-${id}\">\n";
    echo "    <div class=\"slider\">\n";

    foreach ($gallery['items'] as $item) {
        echo "        <a class=\"slide\" href=\"${item['href']}\" rel=\"gallery-${id}\">\n";
        echo "            <img src=\"${item['src']}\" alt=\"\">\n";
        echo "        </a>\n";
    }

    echo "    </div>\n";
    echo "    <div class=\"title\">\n";
    echo "        <span>${gallery['title']}</span>\n";
    echo "    </div>\n";
    echo "</div>\n";
}