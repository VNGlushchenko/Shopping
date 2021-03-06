<?php
require_once 'dbConnect.php';
$query     = '
              SELECT t2.category_id,
                     t2.category_name,
                     t1.product_id,
                     t1.product_name,
                     COALESCE(MAX(t3.price),0) AS last_price
                FROM tGoods           as t1
                JOIN tGoodsCategories as t2 ON t2.category_id = t1.category_id
                LEFT JOIN tPurchases  as t3 ON t3.product_id  = t1.product_id
                JOIN      (
                           SELECT product_id,
                                  MAX(purchase_date) AS last_date
                             FROM tPurchases
                            GROUP BY product_id
                          )           AS t4 ON t4.product_id = t3.product_id
                                           AND t4.last_date  = t3.purchase_date

                GROUP BY t2.category_id,
                         t2.category_name,
                         t1.product_id,
                         t1.product_name
                UNION ALL
               SELECT t2.category_id,
                      t2.category_name,
                      t1.product_id,
                      t1.product_name,
                      0                AS last_price
                 FROM tGoods           AS t1
                 JOIN tGoodsCategories AS t2 ON t2.category_id = t1.category_id
                 LEFT JOIN tPurchases  AS t3 ON t3.product_id  = t1.product_id
                WHERE t3.product_id IS NULL
                UNION ALL
               SELECT t1.category_id,
                      t1.category_name,
                      0,
                      \' \',
                      0                AS last_price
                 FROM tGoodsCategories AS t1
                 LEFT JOIN tGoods      AS t2 ON t2.category_id = t1.category_id
                WHERE t2.product_id IS NULL
                ORDER BY category_name, 
                         product_name
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