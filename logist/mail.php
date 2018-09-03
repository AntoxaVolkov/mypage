<?php

$recepient = "";
$sitename = "DodLog";

$name = trim($_GET["name"]);
$phone = trim($_GET["tel"]);
$email = trim($_GET["email"]);
$text = trim($_GET["msg"]);
$type = trim($_GET["type"]);
if($type == "call"){
	$pagetitle = "Заказ звонка \"$sitename\"";
}else{
	$pagetitle = "Новая заявка с сайта \"$sitename\"";
}


$message = "Имя: $name \nТелефон: $phone \nПочта: $email \nТекст: $text";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");