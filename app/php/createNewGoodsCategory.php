<?php
require_once 'dbConnect.php';
require_once 'prepareRequestData.php';

$new_category_name = str_replace(array('\n','\r\n'), '', $req['newCategoryName']);
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
    
    $new_category_list = array(
        'category_id' => -1,
        'category_name' => ''
    );
    
    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $new_category_list['category_id']   = $row['category_id'];
            $new_category_list['category_name'] = $row['category_name'];
        }
        mysqli_close($con);
        
        http_response_code(200);
        echo json_encode($new_category_list, JSON_NUMERIC_CHECK);
    }
}
?>