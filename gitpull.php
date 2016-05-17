<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    
    if(file_exists('pid')){
        $pid = trim(file_get_contents('pid'));
        if($pid != ""){
            exec("kill $pid", $out);
            sendMessage("Git pull requested; killing bot with pid `$pid`");
        } else {
            sendMessage("pid is empty!");
        }
    } else {
       sendMessage("pid file doesn't exist!");
    }
    
    $result = shell_exec("/usr/bin/git pull 2>&1");
    $url_result = urlencode($result);
    sendMessage("Pull+result%3A%0D%0A`$url_result`", true);
    echo $result;
    
    exec("/bin/bash start.sh >pid");
    $pid = trim(file_get_contents("pid"));
    if($pid != ""){
        sendMessage("Bot restarted with pid `$pid`");
    } else {
        sendMessage("*WARNING* No pid returned from node process!");
    }
    
    function sendMessage($message, $encoded = false){
        $API_KEY = '189123836:AAH203OMm-A3rpZo4PZ2a1JIp2iNh7p8j94';
        $url = "https://api.telegram.org/bot$API_KEY/sendMessage?chat_id=16715013&parse_mode=Markdown&text=";
        if(!$encoded){
            $message = urlencode($message);
        }
        $ch = curl_init($url . $message);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
    }
    
?>