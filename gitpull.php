<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

function sendMessage($message, $encoded = false){
	$env = file_get_contents('.env');
	$API_KEY = substr($env, 10);
	$url = "https://api.telegram.org/bot$API_KEY/sendMessage?chat_id=-108631846&parse_mode=Markdown&text=";
	if(!$encoded){
		$message = urlencode($message);
	}
	$ch = curl_init($url . $message);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_exec($ch);
	curl_close($ch);
}

$result = shell_exec("/usr/bin/git pull 2>&1");
$url_result = urlencode($result);
sendMessage("Pull+result%3A%0D%0A`$url_result`", true);
echo $result;

sendMessage("Git pull completed; restarting bot");
exec("pm2 restart BeMEAN-bot");

?>