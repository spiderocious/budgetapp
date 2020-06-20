<?php
	include 'my.php';
	header("Access-Control-Allow-Origin:*");
				// Output: 54esmdr0qf
				
	$data = parse(file_get_contents('php://input'));

	if(isset($data)){
		$array = explode('&^%',$data);
		if(count($array)==4){
			$i =0;
			while ($i>count($array)) {
			if(empty($array[$i])){
				//echo 500;
				echo '{"code":500,"token":"Empty Form Fields"}';
				exit();
			}
			$i++;
			# code...
		}
		$email = $array[0];
		$token = $array[1];
		$sql = query("SELECT userid,username FROM users WHERE useremail='$email' AND usertoken='$token' ");
		$check = check($sql);
		if($check<1){
			//echo '{"code":403,"token":"Invalid User,Consider logging out and Log in back"}';	
			$userid = 0;
					
		}
		else {
			$rom = fetch($sql);
			$userid = $rom['userid'];
		}
			$code = $array[2];
			$s = query("SELECT * FROM sharecodes WHERE code='$code' ");
			$see = check($s);
			if($see<1){
				echo '{"code":404,"token":"Incorrect or revoked Link,Maybe the share code has been deleted by the owner"}';	
			}
			else {
				$row = fetch($s);
				$admin = $row['sharedby'];
				if($sharedby==$userid){
					echo '{"code":200,"token":"You don\'t have the permission to make changes to this budget"}';
				}
				else {
					echo '{"code":403,"token":"You don\'t have the permission to make changes to this budget"}';
				}

			}
		

		}
		else {
			echo '{"code":404,"token":"Invalid Request"}';
		}
		}
	else {
		echo '{"code":404,"token":"Empty Request Header"}';
				
	}
?>



