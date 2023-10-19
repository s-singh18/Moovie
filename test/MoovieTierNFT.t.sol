// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MoovieTierNFT} from "../src/contracts/MoovieTierNFT.sol";

contract MoovieTierNFTTest is Test {
    MoovieTierNFT public moovieTierNFT;

    address immutable ALICE = makeAddr("ALICE");
    address immutable BOB = makeAddr("BOB");

    struct Tier {
        address creator;
        uint256 price;
        // Store position for efficient deletion
        uint256 indexInCreatorList;
        string name;
        bytes32 newTransactionId;
        bytes32 oldTransactionId;
    }

    string constant DEFAULT_URI =
        "https://ipfs.io/ipfs/bafkreib2aqiu6u74ct3ulnw7bdy7c4sdxhzh6bohk7gkt56mqb2shhz25a";

    function setUp() public {
        moovieTierNFT = new MoovieTierNFT();
    }

    function testCreateTier(uint256 price, string memory name) external {
        vm.assume(bytes(name).length > 0);

        vm.startPrank(ALICE);

        uint256 newTierID = moovieTierNFT.totalSupply() + 1;
        uint256 amountToMint = 1;

        moovieTierNFT.createTier(price, name);

        assertEq(moovieTierNFT.balanceOf(ALICE, newTierID), amountToMint);

        vm.stopPrank();
    }

    function testRevertCreateTierInvalidName(uint256 price) external {
        string memory name = "";

        vm.startPrank(ALICE);

        vm.expectRevert("Invalid name");

        moovieTierNFT.createTier(price, name);
    }

    function testDeleteTier(uint256 price, string memory name) external {
        vm.assume(bytes(name).length > 0);

        vm.startPrank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDsBefore = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );
        (
            address creatorBefore,
            uint256 priceBefore,
            ,
            string memory nameBefore,
            ,

        ) = moovieTierNFT.tiers(creatorTierIDsBefore[0]);

        assertEq(creatorBefore, ALICE);
        assertEq(priceBefore, price);
        assertEq(nameBefore, name);

        moovieTierNFT.deleteTier(creatorTierIDsBefore[0]);

        uint256[] memory creatorTierIDsAfter = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );
        (
            address creatorAfter,
            uint256 priceAfter,
            ,
            string memory nameAfter,
            ,

        ) = moovieTierNFT.tiers(creatorTierIDsAfter[0]);

        assertEq(creatorAfter, address(0));
        assertEq(priceAfter, 0);
        assertEq(bytes(nameAfter).length, 0);

        vm.stopPrank();
    }

    function testRevertDeleteTierNotCreator(
        uint256 price,
        string memory name
    ) external {
        vm.assume(bytes(name).length > 0);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        vm.expectRevert("Only tier creator can execute this function");

        vm.prank(BOB);

        moovieTierNFT.deleteTier(creatorTierIDs[0]);
    }

    function testMint(
        uint256 price,
        string memory name,
        uint256 amountToMint
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(price < 100 ether);
        vm.assume(amountToMint < 100);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );
        uint256 mintPrice = price * amountToMint;

        hoax(BOB, mintPrice);

        moovieTierNFT.mint{value: price * amountToMint}(
            creatorTierIDs[0],
            amountToMint
        );

        assertEq(moovieTierNFT.balanceOf(BOB, creatorTierIDs[0]), amountToMint);
    }

    function testRevertMintNonexistentTierID(
        uint256 price,
        string memory name,
        uint256 amountToMint
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(price < 100 ether);
        vm.assume(amountToMint < 100);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256 mintPrice = price * amountToMint;
        uint256 nonExistentTierID = moovieTierNFT.totalSupply() + 1;

        hoax(BOB, mintPrice);

        vm.expectRevert("tierID does not exist");

        moovieTierNFT.mint{value: price * amountToMint}(
            nonExistentTierID,
            amountToMint
        );
    }

    function testRevertMintInsufficientFundsSent(
        uint256 price,
        string memory name,
        uint256 amountToMint,
        uint256 mintPrice
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(price < 100 ether);
        vm.assume(amountToMint < 100);
        vm.assume(mintPrice < price * amountToMint);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        hoax(BOB, mintPrice);

        vm.expectRevert("Insufficient mint price sent");

        moovieTierNFT.mint{value: mintPrice}(creatorTierIDs[0], amountToMint);
    }

    function testChangeTierName(
        uint256 price,
        string memory name,
        string memory newName
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(bytes(newName).length > 0);
        vm.assume(
            keccak256(abi.encodePacked(name)) !=
                keccak256(abi.encodePacked(newName))
        );

        vm.startPrank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        moovieTierNFT.changeTierName(creatorTierIDs[0], newName);

        (, , , string memory nameAfter, , ) = moovieTierNFT.tiers(
            creatorTierIDs[0]
        );

        assertEq(nameAfter, newName);

        vm.stopPrank();
    }

    function testRevertChangeTierNameNotCreator(
        uint256 price,
        string memory name,
        string memory newName
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(bytes(newName).length > 0);
        vm.assume(
            keccak256(abi.encodePacked(name)) !=
                keccak256(abi.encodePacked(newName))
        );

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        vm.prank(BOB);

        vm.expectRevert("Only tier creator can execute this function");

        moovieTierNFT.changeTierName(creatorTierIDs[0], newName);
    }

    function testChangeTierPrice(
        uint256 price,
        string memory name,
        uint256 newPrice
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(price != newPrice);

        vm.startPrank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        moovieTierNFT.changeTierPrice(creatorTierIDs[0], newPrice);

        (, uint256 priceAfter, , , , ) = moovieTierNFT.tiers(creatorTierIDs[0]);

        assertEq(newPrice, priceAfter);

        vm.stopPrank();
    }

    function testRevertChangeTierPriceNotCreator(
        uint256 price,
        string memory name,
        uint256 newPrice
    ) external {
        vm.assume(bytes(name).length > 0);
        vm.assume(price != newPrice);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        vm.prank(BOB);

        vm.expectRevert("Only tier creator can execute this function");

        moovieTierNFT.changeTierPrice(creatorTierIDs[0], newPrice);
    }

    function testChangeTransactionIds(
        uint256 price,
        string memory name,
        string memory newTransactionId,
        string memory oldTransactionId
    ) external {
        vm.assume(bytes(name).length > 0);

        vm.startPrank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        moovieTierNFT.changeTransactionIds(
            creatorTierIDs[0],
            newTransactionId,
            oldTransactionId
        );

        (
            ,
            ,
            ,
            ,
            string memory newTransactionIdAfter,
            string memory oldTransactionIdAfter
        ) = moovieTierNFT.tiers(creatorTierIDs[0]);

        assertEq(newTransactionId, newTransactionIdAfter);
        assertEq(oldTransactionId, oldTransactionIdAfter);

        vm.stopPrank();
    }

    function testRevertChangeTransactionIdsNotCreator(
        uint256 price,
        string memory name,
        string memory newTransactionId,
        string memory oldTransactionId
    ) external {
        vm.assume(bytes(name).length > 0);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        vm.prank(BOB);

        vm.expectRevert("Only tier creator can execute this function");

        moovieTierNFT.changeTransactionIds(
            creatorTierIDs[0],
            newTransactionId,
            oldTransactionId
        );
    }

    function testSetTierTokenURI(
        uint256 price,
        string memory name,
        string memory tokenURI
    ) external {
        vm.assume(bytes(name).length > 0);

        vm.startPrank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        moovieTierNFT.setTierTokenURI(creatorTierIDs[0], tokenURI);

        string memory uri = moovieTierNFT.uri(creatorTierIDs[0]);

        if (bytes(tokenURI).length == 0) {
            assertEq(
                keccak256(abi.encodePacked(uri)),
                keccak256(abi.encodePacked(DEFAULT_URI))
            );
        } else {
            assertEq(
                keccak256(abi.encodePacked(uri)),
                keccak256(abi.encodePacked(tokenURI))
            );
        }

        vm.stopPrank();
    }

    function testRevertSetTierTokenURINotCreator(
        uint256 price,
        string memory name,
        string memory tokenURI
    ) external {
        vm.assume(bytes(name).length > 0);

        vm.prank(ALICE);

        moovieTierNFT.createTier(price, name);

        uint256[] memory creatorTierIDs = moovieTierNFT.getCreatorTierIDs(
            ALICE
        );

        vm.prank(BOB);

        vm.expectRevert("Only tier creator can execute this function");

        moovieTierNFT.setTierTokenURI(creatorTierIDs[0], tokenURI);
    }
}
