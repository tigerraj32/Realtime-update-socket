//
//  SocketManager.swift
//  ChatClient-iOS
//
//  Created by rajan twanabashu on 1/28/20.
//  Copyright © 2020 javra. All rights reserved.
//

import Foundation
import SocketIO


class SocketIOManager: NSObject {
    
    static let shared:SocketIOManager = SocketIOManager()
    let manager = SocketManager(socketURL: URL(string: "http://localhost:4040/")!, config: [.log(false), .compress, .connectParams(["token": "rajan1234"])])
    var socket: SocketIOClient!
    
    override init() {
        super.init()
        self.socket = manager.defaultSocket
        self.handleSocketEvent()
        
        // Socket gets connected once the appliation get active. Check in SceneDelegate
    }
    
    func handleSocketEvent() {
        self.connectionEstablished()
        self.connectionClosed()
        self.listenForUpate()
    }
    
    // MARK:- Step 1 - socket connect / disconnect
    func connectionEstablished() {
        self.socket.on(clientEvent: .connect) { (data, ack) in
            print(#function, "socket connected")
            print(#function,data, ack)
            
        }
    }
    
    func connectionClosed() {
        self.socket.on(clientEvent: .disconnect) { (data, ack) in
            print(#function, "socket disconnected")
            print(#function,data, ack)
        }
        
    }
    
    func listenForUpate(){
        
        self.socket.on("broadcast") { (data, ack) in
            print("broadcast message \(data)")
            guard let res = data[0] as? [String: Any] else {
                return
            }
            
            let sensor = res["sensor"] as! String
            let flag = res["flag"] as! Bool
            
            if sensor == "ot1-update" {
                
                WaterLevelControl.shared.overheadSensor1 = flag
            }
            else if sensor == "ot2-update" {
                
                WaterLevelControl.shared.overheadSensor2 = flag
            }
            else if sensor == "dt1-update" {
               
                WaterLevelControl.shared.undergroundSensor1 = flag
            }
            else if sensor == "dt2-update" {
                
                WaterLevelControl.shared.undergroundSensor2 = flag
            }
            else if sensor == "manual-update" {
               
                WaterLevelControl.shared.manualOnOff = flag
            }else{
                print("case not implemented")
            }
            
        }
        
    }
    
    
    
    
}
