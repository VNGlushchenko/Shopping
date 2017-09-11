<?php
require_once 'dbConnect.php';
$query     = '
              SELECT t2.category_id,
                     t2.category_name,
                     t1.product_id,
                     t1.product_name,
                     COALESCE(MAX(t3.price),0) as last_price
                FROM tGoods                                  as t1
                JOIN tGoodsCategories                        as t2 on t2.category_id = t1.category_id
                LEFT JOIN tPurchases                         as t3 on t3.product_id  = t1.product_id
                LEFT JOIN (
                           SELECT product_id,
                                  MAX(purchase_date) as last_date
                             FROM tPurchases
                            GROUP BY product_id
                          )                                  as t4 on t4.product_id = t3.product_id
                                                                  and t4.last_date  = t3.purchase_date
               WHERE t1.category_id <> 4 
               GROUP BY t2.category_id,
                        t2.category_name,
                        t1.product_id,
                        t1.product_name
               ORDER BY t2.category_name, 
                        t1.product_name
             ';
$result        = mysqli_query($con, $query);
$category_id   = array();
$category_name = array();
$product_id    = array();
$product_name  = array();
$last_price    = array();
$json          = array();
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $category_id[]   = $row['category_id'];
        $category_name[] = $row['category_name'];
        $product_id[]    = $row['product_id'];
        $product_name[]  = $row['product_name'];
        $last_price[]    = $row['last_price'];
    }
}
mysqli_close($con);
$json[0] = $category_id;
$json[1] = $category_name;
$json[2] = $product_id;
$json[3] = $product_name;
$json[4] = $last_price;
echo json_encode($json, JSON_NUMERIC_CHECK);
?>