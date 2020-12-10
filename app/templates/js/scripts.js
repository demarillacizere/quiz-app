//businees logic

function Order(size,crust,topping){
    this.pizzaSize = size;
    this.pizzaCrust = crust;
    this.pizzaTopping = topping;
}
Order.prototype.totalPrice=function(){
    return this.pizzaSize + this.pizzaCrust + this.pizzaTopping ;
}
var sum=0;
Order.prototype.ordersPrice=function(){
    sum +=this.totalPrice();
    return sum;
}
var ordersArr=[];

//user-interface logic

$(document).ready(function(){
    $('#order').click(function(){
        $('#new-orders').slideUp();
    });
    $('#new-orders').on('change','#size',function(){
        if($('#size').val()=='1500'){
            $('#small-toppings').show();
            $('#medium-toppings').hide();
            $('#large-toppings').hide();
       }
       else if($('#size').val()=='2000'){
        $('#small-toppings').hide();   
        $('#medium-toppings').show();
        $('#large-toppings').hide();
       }
       else if($('#size').val()=='3000'){
        $('#small-toppings').hide();
        $('#medium-toppings').hide();   
        $('#large-toppings').show();
       }
    });
    $('#new-orders').on('submit','form',function(event){
        event.preventDefault();
        var grandTotal=[];
        let sizePrice=parseInt($('#size').val());
        let crustPrice=parseInt($('input:radio[name=crust]:checked').val());
        let toppingPrices=$('input:checkbox[name="topping"]:checked').map(function(){
            return $(this).val();
        }).get();
        var totalTopping=0;
        toppingPrices.forEach(function(toppingPrice){
            totalTopping += parseInt(toppingPrice);
        });
        if (totalTopping==0){
            alert("Please do select the topping(s) you prefer");
        }
        else{
            newOrder = new Order(sizePrice,crustPrice,totalTopping);
            ordersArr.push(newOrder.totalPrice());
        $(this).last().text('Total price for your order: ' + newOrder.totalPrice() + " rwf");
        }
    });
    $('.container').on('click','#checkout',function(){
        let sum=0;
        for (let index = 0; index < ordersArr.length; index++) {
            sum += ordersArr[index]; 
        }
        var deliveryChoice=confirm('Do you want your order delivered ? The delivery cost is 500 rwf');
        if(deliveryChoice==true){
            prompt("Enter your address (house number , street number and city)");
            alert("Your order will be delivered at your location");
            $('#cart').text("You have made " + ordersArr.length + " order(s) which will be delivered at a total price of " + (sum+500) + " rwf");
        }
        else{
            $('#cart').text("You have made " + ordersArr.length + " order(s) worth a total price of " + sum + " rwf");
        }
    });
    $('.container').on('click','#add-order',function(){
        $('#new-orders').append(
       '<br><form>' +
        '<div class="form-group mb-4">' +
            '<label>Choose the size</label>' +
            '<select id="size" class="form-control">' +
                '<option id="small" value="1500" name="small"><span class="size" >Small</span> - <span>1500</span></option>' +
                '<option id="medium" value="2000"><span class="size" >Medium</span> - <span>2000</span></option>' +
                '<option id="large" value="3000"><span class="size" >Large</span> - <span>3000</span></option>' +
            '</select>' +
        '</div>'+
        '<div class="form-group mb-4">' +
            '<label>Choose the crust</label>' +
            '<div class="custom-control custom-radio"><input id="crispy"class="custom-control-input" type="radio" name="crust" value="1000" required><label class="custom-control-label" for="crispy">Crispy - 1000</label></div>' +
            '<div class="custom-control custom-radio"><input id="stuffed" class="custom-control-input" type="radio" name="crust" value="1500"><label for="stuffed" class="custom-control-label">Stuffed - 1500 rwf</label></div>' +
            '<div class="custom-control custom-radio"><input id="glutten-free" class="custom-control-input" type="radio" name="crust" value="1500"><label for="glutten-free" class="custom-control-label">Glutten-free - 1500</label></button>' +
        '</div><br>' +
        '<div class="form-group mb-4">' +
            '<div id="small-toppings" class="form-group mb-4">' +
                '<label>Please do choose the toppings for your small pizza</label><br>' +
                '<div class="custom-control custom-checkbox"><input id="salad" class="custom-control-input" type="checkbox" name="topping" value="500" > <label class="custom-control-label" for="salad">Vegetable - 1000 rwf</label></div>' +
                '<div class="custom-control custom-checkbox"><input id="sauce" class="custom-control-input" type="checkbox" name="topping" value="800" > <label class="custom-control-label" for="sauce">Sausage - 1500 rwf</label></div>' +
            '</div>' +
            '<div id="medium-toppings" class="form-group mb-4">' +
                '<label>Please do choose the toppings for your medium pizza</label><br>' +
                '<input id="salad" type="checkbox" name="topping" value="700"> <label  for="salad">Vegetable - 700 rwf</label><br>'+
                '<input id="sauce" type="checkbox" name="topping" value="1200"> <label  for="sauce">Sausage - 1200 rwf</label><br>'+
            '</div>' +
            '<div id="large-toppings" class="form-group mb-4">' +
                '<label>Please do choose the toppings for your large pizza</label><br>' +
                '<input id="salad" type="checkbox" name="topping" value="1000"> <label for="salad">Vegetable - 1000 rwf</label><br>'+
                '<input id="sauce"  type="checkbox" name="topping" value="1500"> <label for="sauce">Sausage - 1500 rwf</label><br>' +
            '</div>' +
        '</div>' +
        '<button class="btn btn-outline-success" type="submit" id="submit">Comfirm your order</button><br>' +
        '<div id="output"></div>' +
    '</form>'
        )
    })
})