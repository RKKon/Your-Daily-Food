<?php // берет данные которые пришли из клиента и превращает их в строку и показывает обратно на клиенте
$_POST = json_decode(file_get_contents("php://input"), true); // if в формате JSON приходят данные
echo var_dump($_POST); 
?>