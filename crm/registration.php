<?php
require_once(dirname(__FILE__).'/autoload.php');

$data = array();

$data['name']  = isset($_POST['name']) ? $_POST['name'] : '';
$data['email'] = isset($_POST['email']) ? $_POST['email'] : '';
$data['phone'] = isset($_POST['phone']) ? str_replace(['+', '(', ')',' ', '-'], '', $_POST['phone']) : '';

$data['utm_content']  = isset($_POST['utm_content']) ? $_POST['utm_content'] : '';
$data['utm_campaign'] = isset($_POST['utm_campaign']) ? $_POST['utm_campaign'] : '';
$data['utm_source']   = isset($_POST['utm_source']) ? $_POST['utm_source'] : '';
$data['utm_medium']   = isset($_POST['utm_medium']) ? $_POST['utm_medium'] : '';
$data['utm_term']     = isset($_POST['utm_term']) ? $_POST['utm_term'] : '';

$fullName = explode(' ', $data['name'], 2);
$data['first_name'] = $fullName[0];
$data['last_name'] = empty($fullName[1]) ? '-' : $fullName[1];
$data['product_name'] = "GoIT_Marathon_20";

//Create log file
$d['date_time'] = date("F j, Y, g:i:s a");
$d['REMOTE_ADDR'] = $_SERVER["REMOTE_ADDR"];

$file = fopen('log_sicret_base.txt', "a+");
fwrite($file, ' #---Log--  ');
fwrite($file, print_r($d, 1));
fwrite($file, print_r(' --GET-- ', 1));
fwrite($file, print_r($_GET, 1));
fwrite($file, print_r(' --POST-- ', 1));
fwrite($file, print_r($_POST, 1));
fwrite($file, ' ------#  ');
fclose($file);

//Create contact in zohoCRM


$zohoCrmApi = new ZohoHelperMethods();

if (!empty($data['email'])) {

    $criteria = "select Phone, Email from Contacts where Email = '".$data['email']."' limit 1";

    $contact = $zohoCrmApi->searchByCriteria('Contacts', $criteria);
}

if (!isset($contact['data'][0]['id'])) {
    $jsondata = array(
        "First_Name" => (string)$data['first_name'],
        "Last_Name"  => (string)$data['last_name'],
        "Phone"      => (string)$data['phone'],
        "Email"      => (string)$data['email']
    );

    $data['contact_id'] = $zohoCrmApi->createRecord('Contacts', $jsondata, 'id', 'approval, workflow, blueprint');

} else {
    $data['contact_id'] = $contact['data'][0]['id'];
}

if (!empty($data['contact_id'])) {

    $jsondata = array(
        "Deal_Name"          => sprintf('%s %s', $data['name'], '_' .$data['product_name']),
        "Stage"              => "Distribution",
        "Owner"              => "1819773000001861117",
        "Course"             => "1819773000089785159",
        "Layout"             => "1819773000065428001",
        "field23"            => "Нет данных",
        "field19"            => "-",
        "utm_content"        => (string)$data['utm_content'],
        "utm_campaign"       => (string)$data['utm_campaign'],
        "utm_source"         => (string)$data['utm_source'],
        "utm_medium"         => (string)$data['utm_medium'],
        "utm_term"           => (string)$data['utm_term'],
        "Lead_Quality"       => "0",
        "Phone"              => (string)$data['phone'],
        "Email"              => (string)$data['email'],
        "Closing_Date"       => date('Y-m-d'),
        "English_servey"     => "Нет данных",
        "Potential_Category" => "Course",
        "Contact_Name"       => $data['contact_id']
    );

    $data['potential_id'] = $zohoCrmApi->createRecord('Deals', $jsondata, 'id', 'approval, workflow, blueprint');

}

//    file_put_contents(dirname(__FILE__).'/logs.txt', date('Y-m-d H:i:s') .json_encode($data). "\n\n", FILE_APPEND);

die(json_encode([
    'status' => 'success'
]));