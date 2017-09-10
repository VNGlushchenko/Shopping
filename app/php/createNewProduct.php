<?php
require_once 'dbConnect.php';
require_once 'prepareRequestData.php';

$new_product_name = str_replace(array('\n','\r\n'), '', $req['product_name']);
$new_product_name = sanitizeMySQL($con, $new_product_name);

$category_id = str_replace(array('\n','\r\n'), '', $req['category_id']);
$category_id = sanitizeMySQL($con, $category_id);
$category_id = $category_id * 1;

$query_select  = 'select * from tGoods where product_name = \'' . $new_product_name . '\'';
$result_select = mysqli_query($con, $query_select);

if (mysqli_num_rows($result_select) > 0) {
    
    mysqli_close($con);
    
    http_response_code(400);
    
    echo 'Такой товар уже есть в каталоге. Измените название товара.';
} else {
    $query_insert = 'insert into tGoods(product_name, category_id) select \'' . $new_product_name . '\', ' . $category_id;
    
    mysqli_query($con, $query_insert);
    $last_id = mysqli_insert_id($con);
    
    $query_select  = 'select * from tGoods where product_id = ' . $last_id;
    $result_select = mysqli_query($con, $query_select);
    
    $new_product_list = array(
        'product_id' => -1,
        'product_name' => '',
        'category_id' => -1
    );
    
    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $new_product_list['product_id']   = $row['product_id'];
            $new_product_list['product_name'] = $row['product_name'];
            $new_product_list['category_id']  = $row['category_id'];
        }
        mysqli_close($con);
        
        http_response_code(200);
        echo json_encode($new_product_list, JSON_NUMERIC_CHECK);
    }
}
?>