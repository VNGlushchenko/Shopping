<?php
require_once 'dbConnect.php';
require_once 'prepareRequestData.php';

$date_from = str_replace(array('\n','\r\n'), '', $req['dateFrom']);
$date_from = sanitizeMySQL($con, $date_from);

$date_to = str_replace(array('\n','\r\n'), '', $req['dateTo']);
$date_to = sanitizeMySQL($con, $date_to);

$goods_category = str_replace(array('\n','\r\n'), '', $req['goodsCategory']);
$goods_category = sanitizeMySQL($con, $goods_category);
$goods_category = $goods_category * 1;

if ($goods_category == 0) {
    //create categories list - begin
    $query_select  = 'SELECT * FROM tGoodsCategories ORDER BY category_name';
    $result_select = mysqli_query($con, $query_select);
    
    $categories_list = array();
    
    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $tmp = array(
                'category_id' => -1,
                'category_name' => ''
            );
            $tmp['category_id']   = $row['category_id'];
            $tmp['category_name'] = $row['category_name'];
            $categories_list[] = $tmp;
        }
    }
    //create categories list - end
    //---------------------------------//
    //create goods consumption total data - begin
    $query_select  = 'SELECT t2.category_name,
                             SUM(t3.cost)     AS total_cost
                        FROM tGoods           AS t1
                        JOIN tGoodsCategories AS t2 on t2.category_id = t1.category_id
                        JOIN tPurchases       AS t3 on t3.product_id  = t1.product_id
                       WHERE t3.purchase_date between \''.$date_from.'\' and \''.$date_to.'\'
                       GROUP BY t2.category_name
                       ORDER BY t2.category_name';
    $result_select = mysqli_query($con, $query_select);

    $pie_chart_data = array();

    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $tmp = array(
                'category_name' => '',
                'total_cost' => 0
            );
            $tmp['category_name']   = $row['category_name'];
            $tmp['total_cost'] = $row['total_cost'];
            $pie_chart_data[] = $tmp;
        }
    }
    //create goods consumption total data - end
    //-----------------------------------------
    //create dynamicsChart data - begin

    //create dynamicsChart data - end
    $response = array(
        'categories_list' => $categories_list,
        'pie_data' => $pie_chart_data
    );
}

echo json_encode($response, JSON_NUMERIC_CHECK);
?>