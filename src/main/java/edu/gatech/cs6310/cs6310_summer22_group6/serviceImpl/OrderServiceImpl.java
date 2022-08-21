package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.*;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.ServiceException;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.*;
import edu.gatech.cs6310.cs6310_summer22_group6.service.OrderService;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.AngryBird;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private StoreMapper storeMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private DroneMapper droneMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private ItemMapper itemMapper;

    @Autowired
    private LineMapper lineMapper;

    @Autowired
    private PilotMapper pilotMapper;

    @Autowired
    private AngryBirdMapper angryBirdMapper;

    @Transactional
    @Override
    public Result startOrder(Order order) {
        try {
            Integer storeId = CommonUtils.getStoreIdByName(order.getStoreName());
            order.setStoreId(storeId);
            if (orderMapper.getOrderByIdentifierAndStoreId(order.getOrderIdentifier(), storeId).size() != 0) {
                return Result.error(Code.CODE_801, "Order identifier already exists");
            }
            if (droneMapper.getDroneByIdentifierAndStore(order.getDroneIdentifier(), storeId).size() == 0) {
                return Result.error(Code.CODE_702, "Drone does not exist");
            }
            Drone drone = droneMapper.getDroneByIdentifierAndStore(order.getDroneIdentifier(), storeId).get(0);
            if (drone.getDroneStatus() == 0 || drone.getRemainingTrip() == 0) {
                return Result.error(Code.CODE_703, "Drone is not available");
            }
            order.setDroneId(drone.getDroneId());
            /*
            if(userMapper.findUserByUsername(order.getUserName()).size() == 0){
                return Result.error(Code.CODE_301, "User does not exist");
            }
            User user = userMapper.findUserByUsername(order.getUserName()).get(0);
            if(customerMapper.getCustomerByUserId(user.getUserId()).size() == 0){
                return Result.error(Code.CODE_306,"User is not a customer");
            }
             */
            drone.setNumOfOrders(drone.getNumOfOrders() + 1);
            droneMapper.updateDrone(drone);
            User user = TokenUtils.getCurrentUser();
            checkBeforeOrder(user);
            Customer customer = customerMapper.getCustomerByUserId(user.getUserId()).get(0);
            order.setCustomerId(customer.getCustomerId());
            orderMapper.startOrder(order);
            return Result.success("Order started successfully");
        } catch (DataAccessException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return Result.error(Code.CODE_100, e.getMessage());
        }
    }

    @Transactional
    @Override
    public Result requestItem(Line line) {
        try {
            Integer storeId = CommonUtils.getStoreIdByName(line.getStoreName());
            if (orderMapper.getOrderByIdentifierAndStoreId(line.getOrderIdentifier(), storeId).size() == 0) {
                return Result.error(Code.CODE_802, "Order identifier does not exist");
            }
            Order order = orderMapper.getOrderByIdentifierAndStoreId(line.getOrderIdentifier(), storeId).get(0);
            Integer orderId = order.getOrderId();
            line.setOrderId(orderId);
            if (itemMapper.getItemByNameAndStore(line.getItemName(), storeId).size() == 0) {
                return Result.error(Code.CODE_902, "Item does not exist");
            }
            Item item = itemMapper.getItemByNameAndStore(line.getItemName(), storeId).get(0);
            Integer itemId = item.getItemId();
            line.setItemId(itemId);
            if (lineMapper.findItemByNameAndOrderId(itemId, orderId).size() != 0) {
                return Result.error(Code.CODE_903, "Item already ordered");
            }
            Integer lineCost = item.getUnitPrice() * line.getQuantity();
            line.setTotalCost(lineCost);
            Integer lineWeight = item.getUnitWeight() * line.getQuantity();
            line.setTotalWeight(lineWeight);
            User user = TokenUtils.getCurrentUser();
            checkBeforeOrder(user);
            Customer customer = customerMapper.getCustomerByUserId(user.getUserId()).get(0);
            if (customer.getPendingOrderCost() + lineCost > customer.getCredit()) {
                return Result.error(Code.CODE_904, "Customer cannot afford new item");
            }
            Drone drone = droneMapper.getDroneByDroneId(order.getDroneId()).get(0);
            if (drone.getRemainingCapacity() < lineWeight) {
                return Result.error(Code.CODE_905, "Drone cannot carry new item");
            }
            lineMapper.addLine(line);
            order.setTotalCost(order.getTotalCost() + lineCost);
            order.setTotalWeight(order.getTotalWeight() + lineWeight);
            orderMapper.updateOrder(order);
            customer.setPendingOrderCost(customer.getPendingOrderCost() + lineCost);
            customerMapper.updateCustomer(customer);
            drone.setRemainingCapacity(drone.getRemainingCapacity() - lineWeight);
            droneMapper.updateDrone(drone);
            return Result.success("Item added to order successfully");
        } catch (DataAccessException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return Result.error(Code.CODE_100, e.getMessage());
        }


    }

    @Transactional
    @Override
    public Result purchaseOrder(Order enteredOrder) {
        Integer storeId = CommonUtils.getStoreIdByName(enteredOrder.getStoreName());
        Store store = storeMapper.getStoreByName(enteredOrder.getStoreName()).get(0);
        if (orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).size() == 0) {
            return Result.error(Code.CODE_802, "Order identifier does not exist");
        }
        Order order = orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).get(0);
        Drone drone = droneMapper.getDroneByDroneId(order.getDroneId()).get(0);
        if (drone.getPilotId() == null) {
            return Result.error(Code.CODE_704, "Drone needs pilot");
        }
        Pilot pilot = pilotMapper.getPilotById(drone.getPilotId()).get(0);
        if (drone.getRemainingTrip() == 0 || drone.getDroneStatus() == 0) {
            return Result.error(Code.CODE_703, "Drone is not available");
        }
        Integer totalCost = order.getTotalCost();
        Integer totalWeight = order.getTotalWeight();
        Customer customer = customerMapper.getCustomerByCustomerId(order.getCustomerId()).get(0);
        customer.setCredit(customer.getCredit() - totalCost);
        customer.setPendingOrderCost(customer.getPendingOrderCost() - totalCost);
        customer.setRating(customer.getRating() + totalCost / 100);
        customerMapper.updateCustomer(customer);
        store.setRevenue(store.getRevenue() + totalCost);
        storeMapper.updateStore(store);
        drone.setRemainingTrip(drone.getRemainingTrip() - 1);
        drone.setRemainingCapacity(drone.getRemainingCapacity() + totalWeight);
        drone.setNumOfOrders(drone.getNumOfOrders() - 1);
        droneMapper.updateDrone(drone);
        pilot.setExperience(pilot.getExperience() + 1);
        pilotMapper.updatePilot(pilot);
        order.setStatus("Purchased");
        orderMapper.updateOrder(order);

        // simulate angry bird
        Result result = simulateAngryBird(enteredOrder);
        return result;
    }

    public Result simulateAngryBird(Order enteredOrder) {
        Integer storeId = CommonUtils.getStoreIdByName(enteredOrder.getStoreName());
        Store store = storeMapper.getStoreByName(enteredOrder.getStoreName()).get(0);
        if (orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).size() == 0) {
            return Result.error(Code.CODE_802, "Order identifier does not exist");
        }
        Order order = orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).get(0);
        Customer customer = customerMapper.getCustomerByCustomerId(order.getCustomerId()).get(0);
        Drone drone = droneMapper.getDroneByDroneId(order.getDroneId()).get(0);
        if (drone.getPilotId() == null) {
            return Result.error(Code.CODE_704, "Drone needs pilot");
        }
        Pilot pilot = pilotMapper.getPilotById(drone.getPilotId()).get(0);
        if (drone.getRemainingTrip() == 0 || drone.getDroneStatus() == 0) {
            return Result.error(Code.CODE_703, "Drone is not available");
        }



        // simulate angry bird
        // get store and customer list to initialize angry bird
        int count = 0;
        List<Store> stores = storeMapper.getAllStores();
        for (Store eachStore: stores) {
            eachStore.setLocation(count++);
        }
        List<Customer> customers = customerMapper.getAllCustomers();
        for (Customer eachCustomer: customers) {
            eachCustomer.setLocation(count++);
        }
        AngryBird angryBird = angryBirdMapper.getAngryBirdParameters().get(0);
        Double probability = angryBird.getProbability();
        Integer totalBirds = angryBird.getTotalBirds();

        // build bird map
        int[] birdMap = new int[count];
        for (int i = 0; i < totalBirds; i++) {
            birdMap[(int) (Math.random() * count)]++;
        }
        int birdsAtStore = birdMap[store.getLocation()];
        int birdsAtCustomer = birdMap[customer.getLocation()];
        int birdsInTheWay = birdsAtStore + birdsAtCustomer;
        double pCrash = calculateCrashChance(probability, birdsInTheWay);
        Random rand = new Random();
        Double threshold = rand.nextDouble();
        // set drone repair cost
        drone.setRepairCost(11);
        if(pCrash > threshold){
            store.setRevenue(store.getRevenue() - drone.getRepairCost());
            storeMapper.updateStore(store);
            return Result.success(Code.CODE_201, "Oh No! Drone is attacked by angry birds. Store revenue was reduced by the repair cost: " +
                     + drone.getRepairCost()
            + ". There were " + birdsAtStore + " birds at store and " + birdsAtCustomer + " birds at customer home. "
            + "The probability of crashing was " + pCrash + ". Unlucky! :(");
        }
        else{
            return Result.success(Code.CODE_202, "Oh Yeah! Drone is not attacked by angry birds. "
                    + "There were " + birdsAtStore + " birds at store and " + birdsAtCustomer + " birds at customer home. "
                    + "The probability of crashing was " + pCrash + ". Lucky! :)");
        }


    }

    public double calculateCrashChance(double probability, int birdsInTheWay){
        double pCrash = 1 - (Math.pow(1 - probability, birdsInTheWay));
        return pCrash;
    }

    /*public boolean birdAttack(Order order, int[] birdMap, AngryBird angrybird) {
        // estimate threshold
        Random rand = new Random();
        Double threshold = rand.nextDouble();

        // get customer and store ID
        int customerID = order.getCustomerId() == null ? 0 : order.getCustomerId().intValue();
        int storeID = order.getStoreId() == null ? 0 : order.getStoreId().intValue();

        // estimate probability at customer and store location
        int birdsAtCustomer = birdMap[customerID];
        Double pCustomer = 1 - (Math.pow(1 - angrybird.getProbability(), birdsAtCustomer));

        int birdsAtStore = birdMap[storeID];
        Double pStore = 1 - (Math.pow(1 - angrybird.getProbability(), birdsAtStore));

        if (pCustomer > threshold || pStore > threshold) {
            return true;
        } else {
            return false;
        }
    }*/

    @Override
    public Result cancelOrder(Order enteredOrder) {
        Integer storeId = CommonUtils.getStoreIdByName(enteredOrder.getStoreName());
        Store store = storeMapper.getStoreByName(enteredOrder.getStoreName()).get(0);
        if (orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).size() == 0) {
            return Result.error(Code.CODE_802, "Order identifier does not exist");
        }
        Order order = orderMapper.getOrderByIdentifierAndStoreId(enteredOrder.getOrderIdentifier(), storeId).get(0);
        Drone drone = droneMapper.getDroneByDroneId(order.getDroneId()).get(0);
        Customer customer = customerMapper.getCustomerByCustomerId(order.getCustomerId()).get(0);
        Integer totalCost = order.getTotalCost();
        Integer totalWeight = order.getTotalWeight();
        customer.setPendingOrderCost(customer.getPendingOrderCost() - totalCost);
        customerMapper.updateCustomer(customer);
        drone.setRemainingCapacity(drone.getRemainingCapacity() + totalWeight);
        drone.setNumOfOrders(drone.getNumOfOrders() - 1);
        droneMapper.updateDrone(drone);
        order.setStatus("Canceled");
        orderMapper.updateOrder(order);
        return Result.success("Order canceled successfully");
    }

    @Override
    public Result displayAllOrders(String storeName) {
        Integer storeId = CommonUtils.getStoreIdByName(storeName);
        List<Order> orderList = orderMapper.getAllPendingOrders(storeId);
        List<Line> res = new ArrayList<>();
        for (Order order : orderList) {
            res.addAll(lineMapper.getAllLines(order.getOrderId()));
        }
        return Result.success(res);

    }

    @Override
    public Result showMyOrders() {
        User user = TokenUtils.getCurrentUser();
        checkBeforeOrder(user);
        Customer customer = customerMapper.getCustomerByUserId(user.getUserId()).get(0);
        //List<Map<String, Object>> res = new ArrayList<>();
        List<Order> orderList = orderMapper.getMyOrders(customer.getCustomerId());
        return Result.success(orderList);
    }


    public void checkBeforeOrder(User user) {
        if (user.getRole() != 0) {
            throw new ServiceException(Code.CODE_306, "User is not a customer");
        }
        if (customerMapper.getCustomerByUserId(user.getUserId()).size() == 0) {
            throw new ServiceException(Code.CODE_402, "Please provide customer information");
        }
    }
}
