<?php
require_once 'dbConnect.php';
require_once 'prepareRequestData.php';

$sales_receipt = str_replace(array('\n','\r\n'), '', $req['salesReceipt']);

$sales_receipt_id = str_replace(array('\n','\r\n'), '', $req['salesReceiptId']);
$sales_receipt_id = sanitizeMySQL($con, $sales_receipt_id);

$insert_rows_count = 0;

if (count($sales_receipt) > 0) {
foreach ($sales_receipt as $item) {
    if (
        gettype($item['productId']) == 'integer' &&
        (gettype($item['productUnit']) == 'integer' || gettype($item['productUnit']) == 'double') &&
        (gettype($item['productPrice']) == 'integer' || gettype($item['productPrice']) == 'double') &&
        (gettype($item['productCost']) == 'integer' || gettype($item['productCost']) == 'double') &&
        gettype($item['purchaseDate']) == 'string' &&
        gettype($sales_receipt_id) == 'string'
        ) {
            $query_insert = 'insert into tPurchases
                            set purchase_date=\''.$item['purchaseDate'].'\', '.
                                'product_id='.$item['productId'].', '.
                                'unit='.$item['productUnit'].', '.
                                'price='.$item['productPrice'].', '.
                                'cost='.$item['productCost'].', '.
                                'sales_receipt_id=\''.$sales_receipt_id.'\'';
            
            mysqli_query($con, $query_insert);
            $insert_rows_count++;
        }
    }

mysqli_close($con);

if (count($sales_receipt) == $insert_rows_count) {
    http_response_code(200);
    echo 'Данные успешно сохранены.';
} else {
    http_response_code(400);
    echo 'Ошибка сохранения данных.';
}
} else {
    http_response_code(400);
    echo 'Пустой список покупок.';
}
?>