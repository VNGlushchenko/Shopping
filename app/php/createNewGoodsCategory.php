<?php
require_once 'db_connect.php';

$req = json_decode(trim(file_get_contents('php://input')), true);
$new_category_name = str_replace(array('\n','\r\n'), '', $req['newCategoryName']);
$new_category_name = sanitizeString($new_category_name);
$new_category_name = sanitizeMySQL($con, $new_category_name);

$query_select  = 'select * from tGoodsCategories where category_name = \'' . $new_category_name . '\'';
$result_select = mysqli_query($con, $query_select);

if (mysqli_num_rows($result_select) > 0) {
    
    mysqli_close($con);
    
    http_response_code(400);
    
    echo 'Такая категория уже есть в каталоге. Измените название категории.';
} else {
    $query_insert = 'insert into tGoodsCategories(category_name) select \'' . $new_category_name . '\'';
    
    mysqli_query($con, $query_insert);
    $last_id = mysqli_insert_id($con);
    
    $query_select  = 'select * from tGoodsCategories where category_id = ' . $last_id;
    $result_select = mysqli_query($con, $query_select);
    
    $categoryList = array(
        'category_id' => -1,
        'category_name' => ''
    );
    
    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $categoryList['category_id']   = $row['category_id'];
            $categoryList['category_name'] = $row['category_name'];
        }
        mysqli_close($con);
        
        http_response_code(200);
        echo json_encode($categoryList, JSON_NUMERIC_CHECK);
    }
}

function sanitizeString($var) {
    if (get_magic_quotes_gpc())
    $var = stripslashes($var);
    $var = htmlentities($var);
    $var = strip_tags($var);
    return $var;
}

function sanitizeMySQL($con, $var) {
    $var = mysqli_real_escape_string($con, $var);
    $var = sanitizeString($var);
    return $var;
}
?>