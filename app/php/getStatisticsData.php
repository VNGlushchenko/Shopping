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
                        JOIN tGoodsCategories AS t2 ON t2.category_id = t1.category_id
                        JOIN tPurchases       AS t3 ON t3.product_id  = t1.product_id
                       WHERE t3.purchase_date between \''.$date_from.'\' and \''.$date_to.'\'
                       GROUP BY t2.category_name
                       ORDER BY SUM(t3.cost) DESC';
    $result_select = mysqli_query($con, $query_select);

    $pie_chart_data = array();

    if (mysqli_num_rows($result_select)) {
        
        while ($row = mysqli_fetch_assoc($result_select)) {
            $tmp = array(
                'name' => '',
                'y' => 0
            );
            $tmp['name']   = $row['category_name'];
            $tmp['y'] = $row['total_cost'];
            $pie_chart_data[] = $tmp;
        }
    }
    //create goods consumption total data - end
    //-----------------------------------------
    //create dynamicsChart data - begin
    $query_select  = 'SELECT CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED) AS year,
                             CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED) AS month,
                             SUM(t3.cost)     AS total_cost
                        FROM tGoods           AS t1
                        JOIN tGoodsCategories AS t2 ON t2.category_id = t1.category_id
                        JOIN tPurchases       AS t3 ON t3.product_id  = t1.product_id
                       WHERE t3.purchase_date between \''.$date_from.'\' and \''.$date_to.'\'
                       GROUP BY CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED),
                                CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED)
                       ORDER BY CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED),
                                CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED)';

    $result_select = mysqli_query($con, $query_select);

    $dynamics_chart_data = array();
    
    $month         = array();
    $year          = array();
    $category_name = array();
    $total_cost    = array();

    if (mysqli_num_rows($result_select)) {
        while ($row = mysqli_fetch_assoc($result_select)) {
            $month[]         = $row['month'];
            $year[]          = $row['year'];
            $category_name[] = 'Все';
            $total_cost[]    = $row['total_cost'];
        }
    }

    $dynamics_chart_data[0] = $month;
    $dynamics_chart_data[1] = $year;
    $dynamics_chart_data[2] = $category_name;
    $dynamics_chart_data[3] = $total_cost;
    //create dynamicsChart data - end
    $response = array(
        'input_category_id' => $goods_category,
        'categories_list' => $categories_list,
        'pie_chart_data' => $pie_chart_data,
        'dynamics_chart_data' => $dynamics_chart_data
    );

    http_response_code(200);
    echo json_encode($response, JSON_NUMERIC_CHECK);

} else {

    $query_select  = 'SELECT category_id AS bool FROM tGoodsCategories WHERE category_id = '.$goods_category;
    $result_select = mysqli_query($con, $query_select);
    
    if (!mysqli_num_rows($result_select)) {
        http_response_code(400);
        echo 'Указана не существующая категория товара!';
    } else {
            //create goods consumption total data - begin
            $query_select  = 'SELECT t1.product_name,
                                     SUM(t3.cost)     AS total_cost
                                FROM tGoods           AS t1
                                JOIN tGoodsCategories AS t2 ON t2.category_id = t1.category_id
                                JOIN tPurchases       AS t3 ON t3.product_id  = t1.product_id
                               WHERE t3.purchase_date between \''.$date_from.'\' and \''.$date_to.'\'
                                 AND t2.category_id ='.$goods_category.'
                               GROUP BY t1.product_name
                               ORDER BY SUM(t3.cost) DESC';

            $result_select = mysqli_query($con, $query_select);

            $pie_chart_data = array();

            if (mysqli_num_rows($result_select)) {

                while ($row = mysqli_fetch_assoc($result_select)) {
                    $tmp = array(
                    'name' => '',
                    'y' => 0
                    );
                    $tmp['name']   = $row['product_name'];
                    $tmp['y'] = $row['total_cost'];
                    $pie_chart_data[] = $tmp;
                }
            }
            //create goods consumption total data - end
            //-----------------------------------------
            //create dynamicsChart data - begin
            $query_select  = 'SELECT CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED) AS year,
                                     CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED) AS month,
                                     t1.category_name,
                                     SUM(t3.cost)     AS total_cost
                                FROM tGoodsCategories AS t1
                                JOIN tGoods           AS t2 ON t2.category_id = t1.category_id
                                JOIN tPurchases       AS t3 ON t3.product_id  = t2.product_id
                               WHERE t3.purchase_date between \''.$date_from.'\' and \''.$date_to.'\'
                                 AND t1.category_id ='.$goods_category.'
                               GROUP BY CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED),
                                        CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED),
                                        t1.category_name
                               ORDER BY CAST(DATE_FORMAT(t3.purchase_date, \'%Y\') AS UNSIGNED),
                                        CAST(DATE_FORMAT(t3.purchase_date, \'%c\') AS UNSIGNED),
                                        t1.category_name';

            $result_select = mysqli_query($con, $query_select);

            $dynamics_chart_data = array();

            $month        = array();
            $year         = array();
            $category_name = array();
            $total_cost   = array();

            if (mysqli_num_rows($result_select)) {
                while ($row = mysqli_fetch_assoc($result_select)) {
                    $month[]         = $row['month'];
                    $year[]          = $row['year'];
                    $category_name[] = $row['category_name'];
                    $total_cost[]    = $row['total_cost'];
                }
            }

            $dynamics_chart_data[0] = $month;
            $dynamics_chart_data[1] = $year;
            $dynamics_chart_data[2] = $category_name;
            $dynamics_chart_data[3] = $total_cost;
            //create dynamicsChart data - end
            $response = array(
            'input_category_id' => $goods_category,
            'pie_chart_data' => $pie_chart_data,
            'dynamics_chart_data' => $dynamics_chart_data
            );

            http_response_code(200);
            echo json_encode($response, JSON_NUMERIC_CHECK);
    } 
}
?>